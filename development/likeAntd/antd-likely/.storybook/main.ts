const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: "[local]___[hash:base64:5]",
            exclude: [path.resolve(__dirname, "../src/styles/global.scss")] //not to make it module because it is imported in global
          }
        },
        "sass-loader"
      ],
      include: path.resolve(__dirname, "../src")
    });
    // config to support the ts
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("babel-preset-react-app")]
          }
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: prop => {
              if (prop.parent) {
                return !prop.parent.fileName.includes("node_modules");
              }
              return true;
            }
          }
        }
      ]
    });
    // Return the altered config
    return config;
  }
};
