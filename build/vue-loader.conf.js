/*
 * @Author: your name
 * @Date: 2020-12-03 17:04:22
 * @LastEditTime: 2020-12-04 16:39:36
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bath-center\config\vue-loader.conf.js
 */
"use strict";
const utils = require("./utils");
const isProduction = process.env.NODE_ENV === "production";
const sourceMapEnabled = true;

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction,
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: true,
  transformToRequire: {
    video: ["src", "poster"],
    source: "src",
    img: "src",
    image: "xlink:href",
  },
};
