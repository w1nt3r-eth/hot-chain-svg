import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import type { Renderer } from "../../src/types/Renderer";
import { Signers } from "../types";
import { shouldBehaveLikeRenderer } from "./Renderer.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("Renderer", function () {
    beforeEach(async function () {
      const rendererArtifact: Artifact = await artifacts.readArtifact("Renderer");
      this.renderer = <Renderer>await waffle.deployContract(this.signers.admin, rendererArtifact, []);
    });

    shouldBehaveLikeRenderer();
  });
});
