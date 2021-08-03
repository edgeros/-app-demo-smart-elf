/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-28 17:08:42
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-08-03 11:20:12
 */

const io = require('socket.io')

let socketio = null
const socketClient = []

/**
 * register websocket service
 * @param {*} app
 */
exports.register = function (app) {
  socketio = io(
    app,
    {
      path: '/smart',
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 50
    }
  )
  socketio.on('connection', function (sockio) {
    socketClient.push(sockio)
    sockio.on('message', (msg) => {
      // messge callback
    })
    sockio.on('disconnect', () => {
      closeSocket(sockio)
    })
  })
}

/**
 * close socket
 * @param {*} sockio
 */
function closeSocket(sockio) {
  const idx = socketClient.findIndex(item => {
    return sockio.id === item.id
  })
  socketClient.splice(idx, 1)
}

/**
 * send message
 * @param {*} cmd
 * @param {*} value
 */
exports.send = function (cmd, value) {
  socketClient.forEach(item => {
    item.emit(cmd, value)
  })
}
