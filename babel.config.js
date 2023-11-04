module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"], //["babel-preset-expo"],
    // plugins: ["@babel/plugin-transform-private-methods"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            // crypto: "react-native-quick-crypto",
            stream: "stream-browserify",
            buffer: "@craftzdog/react-native-buffer",
          },
        },
      ],
    ],
    overrides: [
      {
        test: "./node_modules/ethers",
        plugins: [["@babel/plugin-transform-private-methods", { loose: true }]],
      },
    ],
  };
};
