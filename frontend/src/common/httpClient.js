/**
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * Author       : Fu Wenhao <fuwenhao@acoinfo>
 * Date         : 2021-07-28 11:14:30
 * LastEditors  : Fu Wenhao <fuwenhao@acoinfo>
 * LastEditTime : 2021-08-02 20:33:30
 */

import axios from 'axios'

export function createHttpClient (token, srand) {
  const httpClient = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
      'edger-token': token,
      'edger-srand': srand
    }
  })
  return httpClient
}
