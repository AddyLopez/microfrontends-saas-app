// loader is defined in rules array. purpose of a loader, such as Babel, is to tell Webpack to process different files
// test property's value is a regex which tells Babel to process any file imported with extension of .mjs or .js
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Will inject proper script tags to html file (not necessary to include it in prod or dev config files too)

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
