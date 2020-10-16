/* eslint-disable no-param-reassign */
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const request = axios.create()

let requestList: any[] = []
let isRefreshing = false

function redirectLogin() {
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath,
    },
  })
}

function refreshToken() {
  return axios.post(
    '/front/user/refresh_token',
    qs.stringify({ refreshtoken: store.state.user.refresh_token })
  )
}

request.interceptors.request.use(
  (config) => {
    const { user } = store.state

    if (user && user.access_token) {
      config.headers.Authorization = store.state.user.access_token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response) {
      const { status } = error.response

      if (status === 400) {
        Message.error('请求参数错误')
      } else if (status === 401) {
        const { user } = store.state

        if (!user) {
          redirectLogin()

          return Promise.reject(error)
        }

        if (!isRefreshing) {
          isRefreshing = true

          return refreshToken()
            .then((res) => {
              const { success, content } = res.data

              if (!success) {
                throw new Error('刷新 Token 失败')
              }

              store.commit('setUser', content)

              requestList.forEach((cb) => cb())
              requestList = []

              return request(error.config)
            })
            .catch(() => {
              store.commit('setUser', null)
              redirectLogin()

              return Promise.reject(error)
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve) => {
          requestList.push(() => resolve(request(error.config)))
        })
      } else if (status === 403) {
        Message.error('没有权限，请联系管理员')
      } else if (status === 404) {
        Message.error('请求资源不存在')
      } else if (status >= 500) {
        Message.error('服务器异常')
      }
    } else if (error.request) {
      Message.error(`请求超时，请刷新重试`)
    } else {
      Message.error(`请求失败：${error.message}`)
    }

    return Promise.reject(error)
  }
)

export default request
