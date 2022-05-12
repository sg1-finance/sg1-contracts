const hre = require("hardhat");
const { ethers } = hre;

// Fantom Testnet
const DEPLOYED = {
  "Oracle": "0x971514b20bD0eE8F17E1B252A8B4243C8D3DF70f",
};

let oracle;

async function main() {
  const oracleAddress = DEPLOYED["Oracle"];

  if(!oracleAddress) {
    throw `Contract ${contractName} not deployed?`;
  }

  const contractFactory = await ethers.getContractFactory("Oracle");
  oracle = await contractFactory.attach(oracleAddress);
  console.log(`Attached existing oracle: ${oracleAddress}`);
  const tx = await oracle.update();
  await tx.wait();
  console.log(`oracle.update tx: ${tx.hash}`);

  // TODO: When non-owner executes before epoch is over, tx reverts with:
  // 'Epoch: only operator allowed for pre-epoch'
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
