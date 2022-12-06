import { ReactComponent as Close } from '@assets/icons/Close.svg'
import { ReactComponent as Plus } from '@assets/icons/Plus.svg'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import Input from '@components/Input'
import { useNavigation } from '@hooks/useNavigation'
import Layout from '@layout'
import { createArticle } from '@services/createArticle'
import { ArticleCreateProps } from '@types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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
          <div>
            <h3 className='font-medium text-sm'>Adicionar tags</h3>
            <TagsController
            />
          </div>
        </Form>
      </div>
    </Layout>
  )
}

function TagsController () {
  return (
    <div className='flex gap-[5px] py-[10px]'>
      <div
        key={`article-tag-${1}`}
        className="flex gap-4 justify-center items-center cursor-pointer hover:bg-alter-blue active:bg-smooth-blue w-fit px-[6px] py-2 bg-blue rounded-[4px] text-white font-medium first-letter:uppercase"
      >
        <span>
          {/* {tagName} */}
          tecnologia
        </span>
        <button className='flex justify-center items-center w-4 h-4 fill-white'>
          <Close className='w-full h-full' />
        </button>
      </div>
      <div
        key={`article-tag-${2}`}
        className="flex gap-4 justify-center items-center cursor-pointer hover:bg-slate-200 active:bg-zinc-300 w-fit px-[6px] py-2 bg-white border-[2px] border-solid border-slate-300 rounded-[4px] text-slate-400 font-medium first-letter:uppercase"
      >
        <span>
          Adicionar
        </span>
        <button className='flex justify-center items-center w-4 h-4 fill-slate-400'>
          <Plus className='w-full h-full' />
        </button>
      </div>
    </div>
  )
}
