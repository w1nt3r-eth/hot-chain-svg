import { expect } from 'chai';

const renderSVG = (tokenId: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" style="background:#000"><text x="20" y="40" font-size="22" fill="white" ><![CDATA[Hello, token #]]>${tokenId}</text><rect fill="purple" x="20" y="50" width="160" height="10" ></rect></svg>`;

export function shouldBehaveLikeRenderer(): void {
  it('Should be deployed', async function () {
    expect(this.renderer.deployed()).not.to.be.undefined;
  });

  it('Should render the right token id', async function () {
    const tokenIds = Array.from({ length: 10 }).map((_, i) => i);

    for (const tokenId of tokenIds) {
      const svgFromContract = await this.renderer.render(tokenId);

      expect(svgFromContract).to.be.equal(
        renderSVG(tokenId),
        "Nft doesn't match"
      );
    }
  });
}
