import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueAxios from 'vue-axios'
import { createHttpClient } from './common/httpClient'
import VueSocketIO from 'vue-socket.io'
import { edger } from '@edgeros/web-sdk'
import SocketIO from 'socket.io-client'

edger.token().then(data => {
  var { token, srand } = data
  Vue.use(VueAxios, createHttpClient(token, srand))
  Vue.use(Vant)
  /**
   * 获取校验权限信息
   */
  var socketOptions = {
    path: '/smart',
    query: {
      'edger-token': token,
      'edger-srand': srand
    }
  }
  // var socket = SocketIO(`https://${window.location.hostname}:7368`, socketOptions)
  var socket = SocketIO(socketOptions)
  Vue.use(new VueSocketIO({
    debug: true,
    connection: socket,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
  )
  socket.on('connect', () => {
    console.log('socket 通道已打开')
  })

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}).catch(error => {
  console.error(error)
})
