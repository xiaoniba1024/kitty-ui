'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')   // node 命令加载动画
const rm = require('rimraf')  // node 模块 删除工具 包裹了  rm -rf 
const path = require('path')  // node path模块
const chalk = require('chalk') // 第三方包 chalk 这个包是为了使输出不再单调,添加文字背景什么的,改变字体颜色什么的
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {  //使用 webpackConfig 配置 webpack
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
