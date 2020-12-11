/*
 * @Author: wangn
 * @Date: 2020-12-04 16:32:57
 * @LastEditTime: 2020-12-11 17:52:33
 */
"use strict";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageConfig = require("../package.json");

exports.assetsPath = function(_path) {
  const assetsSubDirectory = "static";

  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function(options) {
  options = options || {};

  const cssLoader = {
    loader: "css-loader",
    options: {
      sourceMap: options.sourceMap,
    },
  };

  const postcssLoader = {
    loader: "postcss-loader",
    options: {
      sourceMap: options.sourceMap,
    },
  };

  // generate loader string to be used with MiniCssExtractPlugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + "-loader",
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }

    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders) // dl新增
    } else {
      return ["style-loader"].concat(loaders); //vue-style-loader 不生效
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less", {
      javascriptEnabled: true,
      modifyVars: {
        "primary-color": "#f48b19",
      },
    }),
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus"),
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp("\\." + extension + "$"),
      use: loader,
    });
  }

  return output;
};

exports.createNotifierCallback = () => {
  const notifier = require("node-notifier");

  return (severity, errors) => {
    if (severity !== "error") return;

    const error = errors[0];
    const filename = error.file && error.file.split("!").pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ": " + error.name,
      subtitle: filename || "",
      icon: path.join(__dirname, "./src/assets/logo.png"),
    });
  };
};
