import qs from 'qs'
import request from '@/utils/request'

export function login(params: { phone: string; password: string }) {
  return request.post('/front/user/login', qs.stringify(params))
}

export function logout() {
  return request.post('/front/user/logout')
}

export function getUserInfo() {
  return request.get('/front/user/getInfo')
}
