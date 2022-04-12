const path = require('path');
const compile = require('./compile');

const code = compile(path.join(__dirname, '..', 'contracts', 'Renderer.sol'));
console.log(code);
