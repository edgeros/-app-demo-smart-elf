/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 * 
 * Detailed license information can be found in the LICENSE file.
 * 
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-28 14:06:47
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-07-29 17:49:53
 */

var Device = require('device');

/**
 * 返回设备列表
 * @returns array 
 */
function getDevlist() {
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
function getDevlistInfo(dev) {
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
function connectDevice(devid) {
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
function sendMsg(dev, msg) {
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


function disconnect(dev) {
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

module.exports = {
  getDevlist: getDevlist,
  getDevlistInfo: getDevlistInfo,
  connectDevice: connectDevice,
  disconnect: disconnect,
  sendMsg: sendMsg
}