import { Button } from '@components/Button'
import { Form } from '@components/Form'
import Input from '@components/Input'
import { useNavigation } from '@hooks/useNavigation'
import Layout from '@layout'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Article as ArticleType, ArticlePutProps } from '@types'
import { LoadSpinner } from '@components/Loading'
import { getArticleById } from '@services/getArticleById'
import { editArticle } from '@services/editArticle'

interface FormValues {
  _id: string
  title: string
  content: string
  tags?: string
}

export function EditeArticle () {
  const [loading, setLoadingState] = useState(false)
  const { setActions, setMainArea } = useNavigation()
  const [currentArticle, setCurrentArticle] = useState<{ data: ArticleType, loading: boolean }>({ loading: true } as { data: ArticleType, loading: boolean })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { articleId } = useParams<{ articleId: string }>()
  const navigate = useNavigate()
  const methods = useForm<FormValues | any>({
    defaultValues: {
      title: '',
      content: '',
      tags: ''
    }
  })

  function handleCancelClick () {
    navigate(-1)
  }

  function submit (e: any) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    methods.handleSubmit(async (data: FormValues) => {
      setLoadingState(true)
      const response: ArticlePutProps = ({
        articleId: data._id,
        title: data.title,
        content: data.content,
        tags: data.tags !== '[]' ? JSON.stringify(String(data.tags).replace(/\[\]/, '')) : undefined
      })
      await editArticle(response)
      // setTimeout(() => {
      setLoadingState(false)
      navigate(-1)
      // }, 800)
    })()
  }

  useEffect(() => {
    setMainArea([])
    setActions([
      <Button.Secondary
        className='small'
        key="cancel-button"
        title='Cancelar'
        onClick={handleCancelClick}
        disabled={loading}
      />,
      <Button
        className='small'
        key="save-button"
        title='Salvar'
        onClick={submit}
        disabled={loading}
      />
    ])
  }, [loading])

  useEffect(() => {
    if (articleId) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async function fetchArticle () {
        const articles = await getArticleById(articleId)
        setCurrentArticle({ data: articles.data[0], loading: false })
      })()
    }
  }, [articleId])

  useEffect(() => {
    if (!currentArticle.loading) {
      methods.setValue('title', currentArticle.data.title)
      methods.setValue('content', currentArticle.data.content)
      methods.setValue('tags', JSON.stringify(currentArticle.data.tags))
      methods.setValue('_id', currentArticle.data._id)
      console.log(currentArticle)
    }
  }, [currentArticle])

  if (currentArticle.loading) {
    return <LoadSpinner />
  }

  return (
    <Layout>
      <div className='tuitui-article--preview w-full h-full rounded-lg bg-white py-[5px] px-2 overflow-hidden'>
        <Form methods={methods}>
          <Input
            control={methods.control}
            name='title'
            label='Título do artigo'
            isRequired='Campo obrigatório'
          />
          <Input.Text
            control={methods.control}
            placeholder="Escreva seu artigo em linguagem de markdown"
            name='content'
            label='Conteúdo do artigo'
            isRequired='Campo obrigatório'
            caption={true}
            captionText='Escreva até um máximo de 5000 caractéres'
          />
        </Form>
      </div>
    </Layout>
  )
}
