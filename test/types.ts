import type { Renderer } from '../src/types/Renderer';
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import type { Fixture } from 'ethereum-waffle';

declare module 'mocha' {
  export interface Context {
    renderer: Renderer;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
}
