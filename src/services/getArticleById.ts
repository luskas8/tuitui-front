import { getUserLocalStorage } from '@contexts/Authorization/utils'
import { Api } from './api'

export async function getArticleById (id: string) {
  const user = getUserLocalStorage()

  if (user) {
    const response = await Api.get('/articles', {
      params: { id },
      headers: {
        Authorization: `Bearer ${user.token ?? ''}`
      }
    })

    return response.data
  }
}
