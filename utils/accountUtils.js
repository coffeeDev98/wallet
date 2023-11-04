import { Wallet } from "ethers";

export const generateAccount = (seedPhrase = "", index = 0) => {
  let wallet;

  // generate a random if the seed phrase is not provided
  if (seedPhrase === "") {
    seedPhrase = Wallet.createRandom().mnemonic.phrase;
  }

  wallet = seedPhrase.includes(" ")
    ? Wallet.fromMnemonic(seedPhrase, `m/44'/60'/0'/0/${index}`)
    : new Wallet(seedPhrase);

  const { address } = wallet;
  const account = { address, privateKey: wallet.privateKey, balance: "0" };

  return { account, seedPhrase: seedPhrase.includes(" ") ? seedPhrase : "" };
};

export function shortenAddress(str, numChars = 4) {
  return `${str.substring(0, numChars)}...${str.substring(
    str.length - numChars
  )}`;
}

export function toFixedIfNecessary(value, decimalPlaces = 2) {
  return +parseFloat(value).toFixed(decimalPlaces);
}
