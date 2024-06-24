//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface IRenderer {
    function render(uint256 _tokenId) external view returns (string memory);
}
