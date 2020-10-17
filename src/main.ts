import Vue from 'vue'
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

Vue.filter('formatUrl', (value: string): string => {
  return `/${value.toLowerCase()}`
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
