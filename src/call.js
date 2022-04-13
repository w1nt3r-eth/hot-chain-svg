const { defaultAbiCoder, Interface } = require('@ethersproject/abi');

async function call(vm, address, from) {
  const sigHash = new Interface(['function render()']).getSighash('render');
  const renderResult = await vm.runCall({
    to: address,
    caller: from,
    origin: from,
    data: Buffer.from(sigHash.slice(2), 'hex'),
  });

  if (renderResult.execResult.exceptionError) {
    throw renderResult.execResult.exceptionError;
  }

  const logs = renderResult.execResult.logs?.map(([address, topic, data]) =>
    data.toString().replace(/\x00/g, '')
  );

  if (logs?.length) {
    console.log(logs);
  }

  const results = defaultAbiCoder.decode(
    ['string'],
    renderResult.execResult.returnValue
  );

  return results[0];
}

module.exports = call;
