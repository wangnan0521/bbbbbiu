/*
 * @Author: wangn
 * @Date: 2020-12-03 17:04:22
 * @LastEditTime: 2020-12-11 17:52:56
 * @Description: vue loader配置
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
