/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 * 
 * Detailed license information can be found in the LICENSE file.
 * 
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-28 17:08:42
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-07-29 16:26:24
 */

var io = require('socket.io');

var socketio = null;
var socketClient = [];
// 启动iosocket
exports.startIo = function (app) {
  socketio = io(
    app, {
    path: '/smart',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000
  }
  );
  socketio.on('connection', function (sockio) {
    console.log("有客户端建立:", sockio.id);
    socketClient.push(sockio)
    sockio.on('message', (msg) => {
      console.log("接收到消息", msg);
    });
    sockio.on("disconnect", () => {
      closeSocket(sockio)
    })
  });
}

function closeSocket(sockio) {
  let idx = socketClient.findIndex(item => {
    return sockio.id == item.id
  })
  socketClient.splice(idx, 1)
}

// sendMessage
exports.send = function (cmd, value) {
  socketClient.forEach(item => {
    item.emit(cmd, value);
  })
}