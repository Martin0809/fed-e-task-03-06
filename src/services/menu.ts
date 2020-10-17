import request from '@/utils/request'

export function getMenuNodeList() {
  return request.get('/boss/menu/getMenuNodeList')
}

export function getAllMenu() {
  return request.get('/boss/menu/getAll')
}

export function getMenuInfo(id: string | number = -1) {
  return request.get('/boss/menu/getEditMenuInfo', {
    params: { id },
  })
}

export function createOrUpdateMenu(params: {
  id?: number
  name: string
  href: string
  parentId: number
  description: string
  icon: string
  shown: boolean
  orderNum: number
}) {
  return request.post('/boss/menu/saveOrUpdate', params)
}

export function deleteMenu(id: number) {
  return request.delete(`/boss/menu/${id}`)
}
