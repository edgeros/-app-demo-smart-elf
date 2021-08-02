/*
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * File: main.js.
 *
 * Author: hanhui@acoinfo.com
 *
 */

/* Import system modules */
const WebApp = require('webapp');
var bodyParser = require('middleware').bodyParser;

// const sddc = require("./service/sddc_ser");
/* Import routers */
const myrouter = require('./routers/rest');
const ioSocket = require('./service/socket');




/* Create App */
const app = WebApp.createApp();
// 启动iosocketService
ioSocket.startIo(app)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());

/* Set static path */
app.use(WebApp.static('./public'));

/* Set test rest */
app.use('/api', myrouter);

/* Rend test */
app.get('/temp.html', function (req, res) {
	res.render('temp', { time: Date.now() });
});
console.log("web启动");
/* Start App */
app.start();

/* Event loop */
require('iosched').forever();
