const chai = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");

chai.use(solidity);
const { expect } = chai;

let oracle;

describe("Oracle", function () {
  it("should get deployed successfully", async function () {
    const now = Math.floor(new Date().getTime() / 1000);
    const Oracle = await ethers.getContractFactory("Oracle");
    oracle = await Oracle.deploy(
      "0x6bDCb358CE6D1569b21B071c2Efde3dA5a1DD114", // Testnet SG1-STG SpookySwap pair
      21600, // 6h epochs
      now // start time now
    );
    await oracle.deployed();
    expect(oracle.address).to.exist;
  });

  it("should update", async function () {
    await oracle.update();
  });

  it("Should return the current price when it's consulted", async function () {
    const price = await oracle.consult(
      "0xD6afF545f84948dD4b8A9716442f473ee140C304", // SG1
      // "0x9c3628764Ae209B2eF0a66A3f2D6d716eb106587", // Test STG
      ethers.utils.parseEther("1")
    );
    // expect(price).to.equal(ethers.utils.parseEther("1")); // assuming 1:1 peg
    expect(price).to.be.gt(0);
  });
});
