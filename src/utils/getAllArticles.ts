import { Api } from '@services/api'

export async function getAllArticles (data: any, token?: string) {
  const requestData = {
    [data['search-type']]: data['search-type'] === 'tags' ? [].push(data['search-item']) : data['search-item']
  }

  const responseData = await Api.get('/articles', {
    params: requestData,
    headers: {
      Authorization: `Bearer ${token ?? ''}`
    }
  })

  return responseData.data
}
