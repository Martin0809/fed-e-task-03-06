import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Layout',
    component: () =>
      import(/* webpackChunkName: "layout" */ '../layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
