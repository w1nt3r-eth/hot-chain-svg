// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import {Script, console} from 'forge-std/Script.sol';
import {Renderer} from 'hot-chain-svg/Renderer.sol';
import {IRenderer} from 'hot-chain-svg/IRenderer.sol';
import {Strings} from 'openzeppelin-contracts/utils/Strings.sol';

contract Deploy is Script {
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

        args[0] = 'mkdir';
        args[1] = '-p';
        args[2] = './qa';
        vm.ffi(args);

        args[0] = 'sh';
        args[1] = '-c';
        for (uint256 i = start; i < stop; i++) {
            string memory output = renderer.render(i);
            string[] memory subCommandInputs = new string[](4);
            subCommandInputs[0] = "echo '";
            subCommandInputs[1] = output;
            subCommandInputs[2] = "' > ";
            subCommandInputs[3] = string.concat('./qa/', i.toString(), '.svg');
            args[2] = string.concat(
                subCommandInputs[0],
                subCommandInputs[1],
                subCommandInputs[2],
                subCommandInputs[3]
            );
            vm.ffi(args);
        }
    }
}
