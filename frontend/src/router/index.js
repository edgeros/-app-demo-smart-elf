import Vue from 'vue'
import VueRouter from 'vue-router'
import DeviceList from '../views/DeviceList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/devlist',
    name: 'DevList',
    component: DeviceList
  },
  {
    path: '/zddc',
    name: 'ZDDC',
    component: () => import(/* webpackChunkName: "about" */ '../views/ZDDC.vue')
  },
  {
    path: '/sddc',
    name: 'SDDC',
    component: () => import(/* webpackChunkName: "about" */ '../views/SDDC.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
