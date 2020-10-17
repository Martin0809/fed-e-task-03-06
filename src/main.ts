import Vue from 'vue'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.filter('level2word', (level: number): string => {
  const map = ['一', '二', '三']

  return `${map[level]}级`
})

Vue.filter('formatUrl', (url: string): string => {
  return `/${url.replace(/^\//, '').toLowerCase()}`
})

Vue.filter(
  'formatDate',
  (date: number, format = 'YYYY-MM-DD HH:mm:ss'): string => {
    return dayjs().format(format)
  }
)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
