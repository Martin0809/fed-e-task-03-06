import request from '@/utils/request'

export function getMenuNodeList() {
  return request.get('/boss/menu/getMenuNodeList')
}

export function getAllMenu() {
  return request.get('/boss/menu/getAll')
}
