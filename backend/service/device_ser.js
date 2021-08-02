/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 * 
 * Detailed license information can be found in the LICENSE file.
 * 
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-28 14:06:47
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-08-02 17:56:56
 */

var Device = require('device');

/**
 * 返回设备列表
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
    });
  })
}

/**
 * 获取设备详细信息
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
 * 链接设备
 * @param {*} id 
 * @return device object
 */
exports.connectDevice = function (devid) {
  return new Promise((resolve, reject) => {
    let iotDevice = new Device();
    iotDevice.request(devid, function (error) {
      if (error) {
        reject(error.message);
      } else {
        resolve(iotDevice);
      }
    });
  })
}

/**
 * 断开设备链接
 * @param {*} dev 
 * @returns 
 */
exports.sendMsg = function (dev, msg) {
  return new Promise((resolve, reject) => {
    dev.send(msg, function (error) {
      if (error) {
        reject(error.message);
      } else {
        resolve('success');
      }
    }, 3);
  })
}

/**
 * 断开设备连接
 * @param {*} dev  
 * @returns 
 */
exports.disconnect = function (dev) {
  return new Promise((resovle, reject) => {
    dev.release((error) => {
      if (error) {
        reject(error)
      } else {
        resovle()
      }
    })
  })
}
