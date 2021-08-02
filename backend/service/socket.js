/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 * 
 * Detailed license information can be found in the LICENSE file.
 * 
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-28 17:08:42
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-08-02 18:57:05
 */

var io = require('socket.io');

var socketio = null;
var socketClient = [];

/**
 * 向server 注册websocket
 * @param {*} app 
 */
exports.register = function (app) {
  socketio = io(
    app, {
    path: '/smart',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 50
  }
  );
  socketio.on('connection', function (sockio) {
    socketClient.push(sockio)
    sockio.on('message', (msg) => {
      // 接收socket消息
    });
    sockio.on("disconnect", () => {
      closeSocket(sockio)
    })
  });
}

/**
 * 关闭socket
 * @param {*} sockio 
 */
function closeSocket(sockio) {
  let idx = socketClient.findIndex(item => {
    return sockio.id == item.id
  })
  socketClient.splice(idx, 1)
}

/**
 * 发送消息
 * @param {*} cmd 
 * @param {*} value 
 */
exports.send = function (cmd, value) {
  socketClient.forEach(item => {
    item.emit(cmd, value);
  })
}