import request from '@/utils/request'

export function getAllResource(
  params: {
    id?: number
    name?: string
    startCreateTime?: string
    url?: string
    categoryId?: number
    endCreateTime?: string
    current?: number
    size?: number
  } = {}
) {
  return request.post('/boss/resource/getResourcePages', params)
}

export function getAllCategory() {
  return request.get('/boss/resource/category/getAll')
}
