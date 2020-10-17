import request from '@/utils/request'

export function getAllResource(
  params: {
    id?: number | string
    name?: string
    startCreateTime?: string
    url?: string
    categoryId?: number | string
    endCreateTime?: string
    current?: number | string
    size?: number | string
  } = {}
) {
  return request.post('/boss/resource/getResourcePages', params)
}

export function getAllCategory() {
  return request.get('/boss/resource/category/getAll')
}
