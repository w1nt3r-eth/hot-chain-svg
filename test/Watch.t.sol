// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {Test} from 'forge-std/Test.sol';
import {IRenderer} from 'hot-chain-svg/IRenderer.sol';
import {QA} from 'hot-chain-svg-script/qa.s.sol';

/**
 * @dev Foundry can't "watch" scripts (for now?) so include this in the test folder.
 *      Will output to qa/0.svg unless you override the QA contract.
 */
contract Watch is QA, Test {
    /// @dev suite-specific setup
    function setUp() public virtual {}

    /// @dev renderer-specific setup
    function deployAndConfigureRenderer()
        internal
        virtual
        override
        returns (IRenderer)
    {
        return super.deployAndConfigureRenderer();
    }

    function test_watch() public {
        run(0, 1);
    }
}
