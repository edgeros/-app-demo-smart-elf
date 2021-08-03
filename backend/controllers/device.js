/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-28 14:15:37
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-08-03 11:25:39
 */
const deviceSer = require('../service/device_ser')
const socket = require('../service/socket')

/**
 * get device list
 * @param {*} req
 * @param {*} res
 */
exports.devlist = async function (req, res) {
  try {
    // get devices list
    const devList = await deviceSer.getDevlist()
    const devInfos = []

    for (const dev of devList) {
      // get device info
      dev.info = await deviceSer.getDevlistInfo(dev)
      devInfos.push(dev)
    }

    res.send(devInfos)
  } catch (err) {
    res.send({
      errCode: -1,
      msg: err
    })
  }
}

/**
 * connect device
 * @param {*} req
 * @param {*} res
 */
const openDevice = []
exports.connect = async function (req, res) {
  try {
    const status = openDevice.find(item => {
      return req.query.devid === item.devid
    })

    if (!status) {
      const iotDev = await deviceSer.connectDevice(req.query.devid)
      iotDev.on('message', function (msg) {
        console.log('iotDevice-message', JSON.stringify(msg))
        if (msg.tem) {
          socket.send('sddc', JSON.stringify(msg))
        } else {
          socket.send('zddc', JSON.stringify(msg))
        }
      })

      openDevice.push({
        devid: req.query.devid,
        iotDev: iotDev
      })
    }
    res.send('success')
  } catch (err) {
    res.send({
      errCode: -1,
      msg: err
    })
  }
}

/**
 * disconnect device
 * @param {*} req
 * @param {*} res
 */
exports.disconnect = async function (req, res) {
  try {
    const idx = openDevice.findIndex(item => {
      return req.query.devid === item.devid
    })
    await deviceSer.disconnect(openDevice[idx].iotDev)
    openDevice.splice(idx, 1)
    res.send('success')
  } catch (err) {
    res.send({
      errCode: -1,
      msg: err
    })
  }
}

/**
 * send message
 * @param {*} req
 * @param {*} res
 */
exports.sendMsg = async function (req, res) {
  try {
    const iot = openDevice.find(item => {
      return item.devid === req.body.data.devid
    })
    await deviceSer.sendMsg(iot.iotDev, req.body.data.msg)
    console.log('Send Msg:', JSON.stringify(req.body), '->', iot.devid)
    res.send('success')
  } catch (err) {
    res.send({
      errCode: -1,
      msg: err
    })
  }
}
