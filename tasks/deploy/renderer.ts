import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { Renderer } from "../../src/types/Renderer";
import type { Renderer__factory } from "../../src/types/factories/Renderer__factory";

task("deploy:Greeter")
  .addParam("greeting", "Say hello, be nice")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const greeterFactory: Renderer__factory = <Renderer__factory>await ethers.getContractFactory("Renderer");
    const greeter: Renderer = <Renderer>await greeterFactory.connect(signers[0]).deploy(taskArguments.greeting);
    await greeter.deployed();
    console.log("Greeter deployed to: ", greeter.address);
  });
