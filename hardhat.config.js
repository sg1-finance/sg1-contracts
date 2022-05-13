require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

const { PRIVATE_KEY, INITIAL_BALANCE } = process.env;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      forking: {
        // Fantom Opera (mainnet):
        // url: "https://rpc.ankr.com/fantom",
        // blockNumber: 37600000

        // Fantom testnet:
        url: "https://xapi.testnet.fantom.network/lachesis/",
        blockNumber: 9014000
      },
      accounts: {
        accountsBalance: "1000000000000000000000000"
      }
    },
    testnet: {
      url: "https://xapi.testnet.fantom.network/lachesis/",
      accounts: PRIVATE_KEY !== undefined
        ? [PRIVATE_KEY]
        : [],
    },
  },
};
