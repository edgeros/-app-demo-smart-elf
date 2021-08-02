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

Vue.use(Vant)

edger.token().then(data => {
  var { token, srand } = data
  Vue.use(VueAxios, createHttpClient(token, srand))
  var socketOptions = {
    path: '/smart',
    query: {
      'edger-token': token,
      'edger-srand': srand
    }
  }
  Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO(socketOptions)
  }))
}).finally(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
