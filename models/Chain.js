export const goerli = {
  chainId: "5",
  name: "Goerli",
  blockExplorerUrl: "https://goerli.etherscan.io",
  rpcUrl: "https://goerli.infura.io/v3/59b59e23bb7c44d799b5db4a1b83e4ee",
};

export const mainnet = {
  chainId: "1",
  name: "Ethereum",
  blockExplorerUrl: "https://etherscan.io",
  rpcUrl: "https://mainnet.infura.io/v3/59b59e23bb7c44d799b5db4a1b83e4ee",
};

export const CHAINS_CONFIG = {
  [goerli.chainId]: goerli,
  [mainnet.chainId]: mainnet,
};
