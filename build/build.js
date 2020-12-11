/*
 * @Author: your name
 * @Date: 2020-12-11 15:22:33
 * @LastEditTime: 2020-12-11 15:45:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bath-center\build\build.js
 */
'use strict'
var argv = require('yargs').argv

require('./check-versions')()

process.env.NODE_ENV = 'production'
if (argv.env === 'develop') {
  process.env.NODE_ENV = 'develop'
} else if (argv.env === 'test') {
  process.env.NODE_ENV = 'test'
} else if (argv.env === 'stage') {
  process.env.NODE_ENV = 'stage'
}

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require("../config");
const webpackConfig = require('./webpack.prod.js')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false,
      }) + '\n\n',
    )

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(
      chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
          "  Opening index.html over file:// won't work.\n",
      ),
    )
  })
})
