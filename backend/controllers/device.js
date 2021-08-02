/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 * 
 * Detailed license information can be found in the LICENSE file.
 * 
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-28 14:15:37
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-07-29 17:55:09
 */
var deviceSer = require("../service/device_ser")
var socket = require("../service/socket")

/**
 * 获取设备列表
 * @param {*} req 
 * @param {*} res 
 */
exports.devlist = async function (req, res) {
  try {
    // 获取设备列表
    let devList = await deviceSer.getDevlist();
    let newDev = [];
    // 获取设备详细信息
    for (let i = 0; i < devList.length; i++) {
      let dev = { ...devList[i] }
      dev.info = await deviceSer.getDevlistInfo(devList[i])
      newDev.push(dev)
    }
    res.send(newDev)
  } catch (error) {
    console.log(error);
    res.send({
      errorCode: -1,
      msg: "获取失败"
    })
  }
}

/**
 * 连接设备
 * @param {*} req 
 * @param {*} res 
 */
const openDevice = []
exports.connect = async function (req, res) {
  try {
    let status = openDevice.find(item => {
      return req.query.devId == item.devId
    })

    if (status) {
      res.send("已打开");
    } else {

      let iotDev = await deviceSer.connectDevice(req.query.devId)
      // 监听人体红外感知器
      iotDev.on('message', function (msg) {
        console.log('iotDevice-message', JSON.stringify(msg));
        if (msg.tem) {
          socket.send('sddc', JSON.stringify(msg));
        } else {
          socket.send('zddc', JSON.stringify(msg));
        }
      });

      openDevice.push({
        devId: req.query.devId,
        iotDev: iotDev
      })

      res.send("success");
    }
  } catch (err) {
    console.log('/api/connect', err);
    res.send({
      errorCode: -1,
      msg: "获取失败"
    })
  }
}


/**
 * 断开设备
 */
exports.disconnect = async function (req, res) {
  try {
    let idx = openDevice.findIndex(item => {
      return req.query.devId == item.devId
    })
    await deviceSer.disconnect(openDevice[idx].iotDev)
    openDevice.splice(idx, 1)
    console.log(openDevice, "<<删除后的数组")
    res.send("success");
  } catch (err) {
    console.log(err)
    res.send("fail");
  }
}


/**发送指令 */
exports.sendMsg = async function (req, res) {
  try {
    let iot = openDevice.find(item => {
      return item.devId == req.body.data.devId
    })

    console.log(JSON.stringify(req.body), "===", iot.devId);
    await deviceSer.sendMsg(iot.iotDev, req.body.data.msg)
    res.send("success");
  } catch (err) {
    console.log(err)
    res.send({
      errorCode: -1,
      msg: "处理失败"
    })
  }
}