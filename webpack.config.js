const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const path = require("path");
module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "@dev-box",
    projectName: "styleguide",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    entry: __dirname + "/src/styleguide.js",
    output: {
      filename: "styleguide.js",
      path: path.resolve(__dirname, "dist"),
      // libraryTarget: "system"
    },
    // modify the webpack config however you'd like to by adding to this object
  });
};
//
