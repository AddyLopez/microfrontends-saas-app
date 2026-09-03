const { merge } = require("webpack-merge"); // Function enables merging of config in common file with config in this production file
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN; // production domain value will be defined when CI/CD pipeline is deployed on AWS

// It takes longer to run Webpack in production mode. However, it will optimize and minify JS files.
// filename property of output object sets up a template for naming files during build. contenthash is for caching purposes.
// name: "container" is not required since it's a host module, but it's included per convention
// marketing property's value in remotes object assumes after domain in path a future directory named "marketing" to serve remoteEntry.js. Why? To differentiate different remoteEntry.js files in different subprojects.
const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig); // Merges and exports the configuration files. Second argument will override or take priority over similar options assigned to first argument
