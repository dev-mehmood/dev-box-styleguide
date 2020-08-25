const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "@dev-box",
    projectName: "styleguide",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    output:{
      filename:`[hash]/@dev-box-styleguide.js`
    }
    // modify the webpack config however you'd like to by adding to this object
  });
};
