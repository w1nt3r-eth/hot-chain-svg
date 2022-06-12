const { formatEther } = require('@ethersproject/units');
const ethers = require('ethers');
const fs = require('fs');
const path = require('path');

const address = '0xa7988c8abb7706e024a8f2a1328e376227aaad18';
const url = process.env.PROVIDER_URL;

async function main() {
  const provider = new ethers.providers.JsonRpcProvider({ url });
  const abi = [
    'event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 amount)',
    'event CollectionNameUpdated(address indexed collection, string name)',
  ];
  const contract = new ethers.Contract(address, abi, provider);

  const [mints, names] = await Promise.all([
    contract.queryFilter(
      contract.filters.TransferSingle(null, ethers.constants.AddressZero)
    ),
    contract.queryFilter(contract.filters.CollectionNameUpdated()),
  ]);

  const collectionNames = Object.fromEntries(
    names.map((e) => [e.args.collection.toLowerCase(), e.args.name])
  );

  const owners = [...new Set(mints.map((e) => e.args.to.toLowerCase()))];
  const ensNames = await Promise.all(
    owners.map((address) => provider.lookupAddress(address))
  );

  const ownerNames = Object.fromEntries(
    owners.map((address, index) => [address, ensNames[index] || address])
  );

  const log = mints.map((e) => {
    const { id, to } = e.args;
    const collection = ethers.utils.hexZeroPad(
      id.and(
        ethers.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffff')
      ),
      20
    );

    const name = collectionNames[collection] || collection;
    const owner = ownerNames[to.toLowerCase()];

    return `- [${name}](https://etherscan.io/address/${collection}) by ${owner}`;
  });

  console.log(log);

  const readme = path.resolve(__dirname, '..', 'README.md');
  const content = fs.readFileSync(readme, 'utf8');
  const updated = content.replaceAll(
    /<!-- begin_users -->[\s\S]+<!-- end_users -->/gim,
    ['<!-- begin_users -->', ...log, '<!-- end_users -->'].join('\n')
  );
  fs.writeFileSync(readme, updated);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
