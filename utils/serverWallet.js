const ethers = require("ethers");

const createWallet = () => {
  let provider = new ethers.providers.JsonRpcProvider(
    `https://polygon-mainnet.infura.io/v3/${process.env.API_PROVIDER}`
  );

  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  return wallet;
};

export default createWallet;
