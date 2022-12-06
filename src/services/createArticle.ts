import { getUserLocalStorage } from '@contexts/Authorization/utils'
import { ArticleCreateProps } from '@types'
import { Api } from './api'

export async function createArticle (data: ArticleCreateProps) {
  const user = getUserLocalStorage()

  if (user) {
    try {
      const response = await Api.post('/articles', data, {
        headers: {
          Authorization: `Bearer ${user.token ?? ''}`
        }
      })

      const tagList = data.tags?.map(tag => tag.tagName)
      await Api.post('/tags', { tagList }, {
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
