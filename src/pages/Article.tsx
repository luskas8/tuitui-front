import React, { useEffect, useState } from 'react'
import { Article as ArticleComponent } from '@components/Article'
import { ReactComponent as FileText } from '@assets/icons/FileText.svg'
import Layout from '@layout'
import { useNavigation } from '@hooks/useNavigation'
import { Button } from '@components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { Article as ArticleType } from '@types'
import { getArticleById } from '@services/getArticleById'
import { LoadSpinner } from '@components/Loading'
import { useAuth } from '@hooks/useAuth'

export function Article () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { articleId } = useParams<{ articleId: string }>()
  const { id } = useAuth()
  const [currentArticle, setCurrentArticle] = useState<ArticleType | null>(null)

  const navigate = useNavigate()
  const { setActions, setMainArea } = useNavigation()

  useEffect(() => {
    setMainArea([])
    setActions([
      <Button
        key="new-article-button"
        className='small w-36'
        title='Novo artigo'
        icon={<FileText className='w-full h-full' />}
        onClick={() => {
          navigate('/app/create/article')
        }}
      />
    ])
  }, [id])

  useEffect(() => {
    if (articleId) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async function fetchArticle () {
        const articles = await getArticleById(articleId)
        setCurrentArticle(articles.data[0])
      })()
    }
  }, [articleId])

  if (!currentArticle) {
    return <LoadSpinner fullPage />
  }
  return (
    <Layout>
      <ArticleComponent {...currentArticle} />
    </Layout>
  )
}
