import { Api } from '@services/api'

export async function getAllArticles (data: any, token?: string) {
  const requestData = {
    type: data['search-type'],
    item: data['search-item']
  }

  const responseData = await Api.get('/articles/by', {
    params: requestData,
    headers: {
      Authorization: `Bearer ${token ?? ''}`
    }
  })

  return responseData.data
}
