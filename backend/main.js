/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-19 11:22:45
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-08-03 11:26:48
 */

/* Import system modules */
const WebApp = require('webapp')
const bodyParser = require('middleware').bodyParser

/* Import routers */
const myrouter = require('./routers/rest')
/* Import socket */
const socketIO = require('./service/socket')

/* Create App */
const app = WebApp.createApp()

/* Register Socket Server */
socketIO.register(app)

/* parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded())

/* parse application/json */
app.use(bodyParser.json())

/* Set static path */
app.use(WebApp.static('./public'))

/* Set test rest */
app.use('/api', myrouter)

/* Rend test */
app.get('/temp.html', function (req, res) {
  res.render('temp', { time: Date.now() })
})

/* Start App */
app.start()

/* Event loop */
require('iosched').forever()
