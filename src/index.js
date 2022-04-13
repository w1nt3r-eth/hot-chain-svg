const path = require('path');
const boot = require('./boot');
const compile = require('./compile');
const deploy = require('./deploy');

const SOURCE = path.join(__dirname, '..', 'contracts', 'Renderer.sol');

async function main() {
  const { vm, pk } = await boot();
  const { abi, bytecode } = compile(SOURCE);
  const address = await deploy(vm, pk, bytecode);
  console.log(address);
}

main();
