import Vue from 'vue'
import VueRouter from 'vue-router'
import DeviceList from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/index',
    name: 'index',
    component: DeviceList
  },
  {
    path: '/zddc',
    name: 'zddc',
    component: () => import('../views/zddc.vue')
  },
  {
    path: '/sddc',
    name: 'sddc',
    component: () => import('../views/sddc.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
