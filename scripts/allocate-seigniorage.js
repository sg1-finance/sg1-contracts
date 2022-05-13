const hre = require("hardhat");
const { ethers } = hre;

// Fantom Testnet
const DEPLOYED = {
  "Treasury": "0x326929FB72cf3e935fC1b737D4219956E4E0D259",
};

let treasury;

async function main() {
  const treasuryAddress = DEPLOYED["Treasury"];

  if(!treasuryAddress) {
    throw `Contract ${contractName} not deployed?`;
  }

  const contractFactory = await ethers.getContractFactory("Treasury");
  treasury = await contractFactory.attach(treasuryAddress);
  console.log(`Attached existing treasury: ${treasuryAddress}`);
  const tx = await treasury.allocateSeigniorage();
  await tx.wait();
  console.log(`treasury.allocateSeigniorage tx: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
