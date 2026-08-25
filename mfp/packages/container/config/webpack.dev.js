const { merge } = require("webpack-merge"); // Function enables merging of config in common file with config in this development file
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json"); // Used to facilitate updating of shared dependencies. Here, the JSON gets parsed as a regular JS object

// Development-specific Webpack configuration
const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); // Merges and exports the configuration files. Second argument will override or take priority over similar options assigned to first argument
