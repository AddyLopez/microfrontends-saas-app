const { merge } = require("webpack-merge"); // Function enables merging of config in common file with config in this development file
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Will inject proper script tags to html file
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");

// Development-specific Webpack configuration
const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); // Merges the configuration files. Second argument will override or take priority over similar options assigned to first argument
