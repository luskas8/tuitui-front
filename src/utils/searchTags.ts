import { Api } from '@services/api'

export async function searchTags (token?: string) {
  const responseData = await Api.get('/tags', {
    headers: {
      Authorization: `Bearer ${token ?? ''}`
    }
  })

  return responseData.data
}
