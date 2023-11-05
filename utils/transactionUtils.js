import { ethers, Wallet } from "ethers";
import { CHAINS_CONFIG, goerli } from "../models/Chain";

export const sendToken = async (amount, from, to, privateKey) => {
  const chain = CHAINS_CONFIG[goerli.chainId];

  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  const wallet = new ethers.Wallet(privateKey, provider);

  const tx = {
    to,
    value: ethers.utils.parseEther(amount.toString()),
  };

  const transaction = await wallet.sendTransaction(tx);

  const receipt = await transaction.wait();

  return { transaction, receipt };
};
