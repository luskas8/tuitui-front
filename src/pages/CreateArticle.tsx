import { Button } from '@components/Button'
import { Form } from '@components/Form'
import Input from '@components/Input'
import { useNavigation } from '@hooks/useNavigation'
import Layout from '@layout'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createArticle } from '@services/createArticle'
import { ArticleCreateProps } from '@types'

interface FormValues {
  title: string
  content: string
  tags: string
}

export function CreateArticle () {
  const [loading, setLoadingState] = useState(false)
  const { setActions, setMainArea } = useNavigation()
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
      const response: ArticleCreateProps = ({
        title: data.title,
        content: data.content,
        tags: data.tags !== '[]' ? JSON.stringify(String(data.tags).replace(/\[\]/, '')) : ''
      })
      await createArticle(response)
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

  return (
    <Layout>
      <div className='tuitui-article--preview w-full h-full rounded-lg bg-white py-[5px] px-2 overflow-hidden'>
        <Form methods={methods}>
          <Input
            control={methods.control}
            name='title'
            placeholder='Escreva o título para seu artigo'
            label='Título do artigo'
            isRequired='Campo obrigatório'
          />
          <Input.Text
            control={methods.control}
            name='content'
            placeholder="Escreva seu artigo em linguagem de markdown"
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
