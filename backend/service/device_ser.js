/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-28 14:06:47
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-08-03 11:16:57
 */

const Device = require('device')

/**
 * get device list
 * @returns array
 */
exports.getDevlist = function () {
  return new Promise((resolve, reject) => {
    Device.list(false, function (error, list) {
      if (!error) {
        resolve(list)
      } else {
        resolve([])
      }
    })
  })
}

/**
 * get devices info
 * @param {*} dev
 * @returns
 */
exports.getDevlistInfo = function (dev) {
  return new Promise((resolve, reject) => {
    Device.info(dev.devid, function (error, info) {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}

/**
 * connect device
 * @param {*} id
 * @return device object
 */
exports.connectDevice = function (devid) {
  return new Promise((resolve, reject) => {
    const iotDevice = new Device()
    iotDevice.request(devid, function (error) {
      if (error) {
        reject(error.message)
      } else {
        resolve(iotDevice)
      }
    })
  })
}

/**
 * send message to device
 * @param {*} dev
 * @returns
 */
exports.sendMsg = function (dev, msg) {
  return new Promise((resolve, reject) => {
    dev.send(msg, function (error) {
      if (error) {
        reject(error.message)
      } else {
        resolve('success')
      }
    }, 3)
  })
}

/**
 * disconnect device
 * @param {*} dev
 * @returns
 */
exports.disconnect = function (dev) {
  return new Promise((resolve, reject) => {
    dev.release((error) => {
      if (error) {
        reject(error)
      } else {
        resolve('success')
      }
    })
  })
}
