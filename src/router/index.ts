import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/',
    name: 'Layout',
    component: () =>
      import(/* webpackChunkName: "layout" */ '../layout/index.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
      {
        path: '/menu',
        name: 'MenuIndex',
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/menu/index.vue'),
      },
      {
        path: '/menu/add',
        name: 'CreateOrEdit',
        component: () =>
          import(
            /* webpackChunkName: "home" */ '../views/menu/CreateOrEdit.vue'
          ),
      },
      {
        path: '/menu/:id/edit',
        name: 'CreateOrEdit',
        component: () =>
          import(
            /* webpackChunkName: "home" */ '../views/menu/CreateOrEdit.vue'
          ),
      },
      {
        path: '*',
        name: 'ErrorPage',
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/404.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((item) => item.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
    }
  }

  next()
})

export default router
