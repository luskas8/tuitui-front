import { getUserLocalStorage } from '@contexts/Authorization/utils'
import { ArticlePutProps } from '@types'
import { Api } from './api'

export async function editArticle (data: ArticlePutProps) {
  const user = getUserLocalStorage()

  console.log(data)

  if (user) {
    try {
      const response = await Api.put('/articles', data, {
        headers: {
          Authorization: `Bearer ${user.token ?? ''}`
        }
      })

      return response.data
    } catch (err) {
      console.log(err)
    }
  }
}
