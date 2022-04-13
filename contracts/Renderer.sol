//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import './SVG.sol';
import './Utils.sol';

contract Renderer {
    function render() external pure returns (string memory) {
        return
            string.concat(
                '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" style="background:#000">',
                string.concat(
                    svg.rect(
                        string.concat(
                            svg.prop('fill', 'green'),
                            svg.prop('x', '10'),
                            svg.prop('y', '10'),
                            svg.prop('width', utils.uint2str(100)),
                            svg.prop('height', utils.uint2str(24))
                        ),
                        utils.NULL
                    ),
                    svg.text(
                        string.concat(
                            svg.prop('text-anchor', 'middle'),
                            svg.prop('x', utils.uint2str(50)),
                            svg.prop('y', '100'),
                            svg.prop('font-size', '12'),
                            svg.prop('fill', 'green')
                        ),
                        // _engraving
                        svg.cdata('hello')
                    )
                ),
                '</svg>'
            );
    }
}
