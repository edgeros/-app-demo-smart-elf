/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 * 
 * Detailed license information can be found in the LICENSE file.
 * 
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-28 11:14:30
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-07-30 16:40:12
 */

import axios from 'axios'



export function createHttpClient(token, srand) {
  let httpClient = axios.create({
    baseURL: '',
    timeout: 1000,
    headers: {
      'edger-token': token,
      'edger-srand': srand
    }
  })
  return httpClient
}
