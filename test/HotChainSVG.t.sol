//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/Renderer.sol";

contract HotChainSVG is Test {
    function setUp() public {}

    function test_HotChainSVG() public {
        Renderer r = new Renderer();

        string memory webpage = string.concat(
            "<html>",
            "<title>Hot Chain SVG</title>",
            r.example(),
            "</html>"
        );

        vm.writeFile("index.html", webpage);
    }
}
