import { Api } from '@services/api'

export async function getAllArticles (data: any, token?: string) {
  const searchType = data['search-type']
  const searchItem = data['search-item']

  const tags = [searchItem]

  const requestData = searchType === 'tags' ? encodeURI(JSON.stringify(tags)) : searchItem

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const responseData = await Api.get(`/articles?${[searchType]}=${requestData}`, {
    headers: {
      Authorization: `Bearer ${token ?? ''}`
    }
  })

  return responseData.data
}
