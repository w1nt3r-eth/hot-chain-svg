// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {Script, console} from 'forge-std/Script.sol';
import {Renderer} from 'hot-chain-svg/Renderer.sol';
import {IRenderer} from 'hot-chain-svg/IRenderer.sol';
import {Strings} from 'openzeppelin-contracts/utils/Strings.sol';

contract QA is Script {
    using Strings for uint256;

    function deployAndConfigureRenderer() internal virtual returns (IRenderer) {
        return new Renderer();
    }

    function run() public {
        run(0, 256);
    }

    function run(uint256 start, uint256 stop) public {
        IRenderer renderer = deployAndConfigureRenderer();

        string[] memory args = new string[](3);

        // make ./qa director if it does not exist
        args[0] = 'mkdir';
        args[1] = '-p';
        args[2] = './qa';
        vm.ffi(args);

        args[0] = 'sh';
        args[1] = '-c';
        for (uint256 i = start; i < stop; i++) {
            string memory output = renderer.render(i);
            string[] memory subCommandInputs = new string[](4);
            // pipe output to ./qa/i.svg
            subCommandInputs[0] = "echo '";
            subCommandInputs[1] = output;
            subCommandInputs[2] = "' > ";
            string memory path = string.concat('./qa/', i.toString(), '.svg');
            subCommandInputs[3] = path;
            args[2] = string.concat(
                subCommandInputs[0],
                subCommandInputs[1],
                subCommandInputs[2],
                subCommandInputs[3]
            );
            vm.ffi(args);

            // lint the file using xmllint, piping stderr to error.txt, and returning a byte as status code
            subCommandInputs[0] = '(xmllint ';
            subCommandInputs[1] = path;
            subCommandInputs[2] = ' 2>&1 >/dev/null) > error.txt; echo "0x0$?"';
            args[2] = string.concat(
                subCommandInputs[0],
                subCommandInputs[1],
                subCommandInputs[2]
            );
            bytes memory result = vm.ffi(args); // returns (bytes memory result) {

            // check status code - if it's not 0, there was an error
            bytes1 exitCode = result[0];
            if (exitCode != 0x00) {
                // run xmllint again, this time returning stderr to foundry
                subCommandInputs[
                    0
                ] = 'cast abi-encode "response(bytes)" $((xmllint ';
                subCommandInputs[1] = path;
                subCommandInputs[2] = ' 2>&1 >/dev/null) | xxd -p -c 1000000)';
                args[2] = string.concat(
                    subCommandInputs[0],
                    subCommandInputs[1],
                    subCommandInputs[2]
                );
                bytes memory errorStr = vm.ffi(args);
                string memory revertMessage = string.concat(
                    'Validation for ',
                    i.toString(),
                    '.svg failed with exit code ',
                    uint256(uint8(exitCode)).toString(),
                    '. Error:\n',
                    string(errorStr),
                    '\nThis error message has been saved to ./error.txt'
                );
                // revert with an error message
                revert(revertMessage);
            }
        }
    }
}
