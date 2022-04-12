const fs = require('fs');
const path = require('path');
const solc = require('solc');

function getSolcInput(source) {
  return {
    language: 'Solidity',
    sources: {
      [path.basename(source)]: {
        content: fs.readFileSync(source, 'utf8'),
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
      evmVersion: 'london',
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode'],
        },
      },
    },
  };
}

function findImports(path) {
  try {
    const file = fs.existsSync(path)
      ? fs.readFileSync(path, 'utf8')
      : fs.readFileSync(require.resolve(path), 'utf8');
    return { contents: file };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

function compile(source) {
  const input = getSolcInput(source);
  const output = JSON.parse(
    solc.compile(JSON.stringify(input), { import: findImports })
  );

  let compilationFailed = false;

  if (output.errors) {
    for (const error of output.errors) {
      if (error.severity === 'error') {
        console.error(error.formattedMessage);
        compilationFailed = true;
      } else {
        console.warn(error.formattedMessage);
      }
    }
  }

  if (compilationFailed) {
    return undefined;
  }

  return output;
}

module.exports = compile;
