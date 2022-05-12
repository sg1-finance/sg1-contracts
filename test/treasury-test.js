const chai = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");

chai.use(solidity);
const { expect } = chai;

let treasury;

describe("Treasury", function () {
  it("should get attached", async function () {
    const Treasury = await ethers.getContractFactory("Treasury");
    treasury = await Treasury.attach("0x326929FB72cf3e935fC1b737D4219956E4E0D259"); // Testnet contract address
    expect(treasury.address).to.exist;
  });

  xit("should allocate seigniorage", async function () {
    await treasury.allocateSeigniorage();
    // TODO: If nothing is staked, this reverts with 'Masonry: Cannot allocate when totalSupply is 0'
  });
});
