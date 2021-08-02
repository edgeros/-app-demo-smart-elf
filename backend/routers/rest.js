/*
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * File: rest.js.
 *
 * Author: hanhui@acoinfo.com
 *
 */

const Router = require('webapp').Router;
const device = require("../controllers/device");
/* Create router */
const router = Router.create();

/* Test call */
router.get('/test', function (req, res) {
	res.send('Hello world!');
});

router.get('/devlist', device.devlist)
router.get('/connect', device.connect)
router.get('/disconnect', device.disconnect)
router.post('/sendMsg', device.sendMsg)


/* Export router */
module.exports = router;
