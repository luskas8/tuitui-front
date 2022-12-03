import { Api } from '@services/api'

export async function searchSelect (type: string, search: string, token?: string) {
  const requestData: any = {}
  let url = ''
  if (type === 'author') {
    requestData.username = search
    url = 'users'
  } else {
    requestData.tagName = search
    url = 'tags'
  }

  const responseData = await Api.get(`/${url}`, {
    params: requestData,
    headers: {
      Authorization: `Bearer ${token ?? ''}`
    }
  })

  return responseData.data
}
