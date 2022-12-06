import { getUserLocalStorage } from '@contexts/Authorization/utils'
import { Api } from '@services/api'

export async function searchTags (token?: string) {
  const user = getUserLocalStorage()

  if (user) {
    const responseData = await Api.get('/tags', {
      headers: {
        Authorization: `Bearer ${user.token ?? ''}`
      }
    })

    return responseData.data
  }
}
