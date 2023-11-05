module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
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
