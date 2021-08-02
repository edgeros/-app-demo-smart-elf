/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-26 14:59:59
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-08-02 14:07:07
 */
module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  outputDir: '../back/public',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://192.168.128.1:7368',
        changeOrigin: true,
        secure: false
      },
      '/smart': {
        target: 'https://192.168.128.1:7368',
        ws: true,
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  },
  lintOnSave: false
}
