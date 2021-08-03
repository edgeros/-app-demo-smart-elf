/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-19 11:22:45
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-08-03 11:27:06
 */

const Router = require('webapp').Router
const device = require('../controllers/device')
/* Create router */
const router = Router.create()

router.get('/devlist', device.devlist)
router.get('/connect', device.connect)
router.get('/disconnect', device.disconnect)
router.post('/sendMsg', device.sendMsg)

/* Export router */
module.exports = router
