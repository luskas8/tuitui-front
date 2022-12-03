import { ReactComponent as FileText } from '@assets/icons/FileText.svg'
import { ReactComponent as Search } from '@assets/icons/Search.svg'
import { Article } from '@components/Article'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { Select, SelectText } from '@components/Select'
import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@hooks/useNavigation'
import Layout from '@layout'
import { Article as ArticleType } from '@types'
import { getAllArticles } from '@utils/getAllArticles'
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface FormValues {
  'search-type': string
  'search-item': string
}

export function Homepage () {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<ArticleType[]>([])
  const { setActions, setMainArea } = useNavigation()
  const methods = useForm<FormValues | any>({
    defaultValues: {
      'search-type': '',
      'search-item': ''
    }
  })

  useEffect(() => {
    setActions([
      <Button
        key="new-article-button"
        className='small w-36'
        title='Novo artigo'
        icon={<FileText className='w-full h-full' />}
        onClick={() => {
          navigate('/app/create/:userId')
        }}
      />
    ])
    setMainArea([<SearchBar key="search-bar" methods={methods} updateArticle={setArticles} />])
  }, [])

  return (
    <Layout>
      <Article.Container
        articles={articles}
      />
    </Layout>
  )
}

interface SearchBarProps {
  methods: UseFormReturn<FieldValues, any>
  updateArticle: any
}

function SearchBar ({ methods, updateArticle }: SearchBarProps) {
  const { token } = useAuth()
  const { formState: { isValid, isSubmitting, isValidating } } = methods

  function submit (e: any) {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    methods.handleSubmit(async (data) => {
      console.log(data)
      const articles = await getAllArticles(data, token)
      updateArticle(articles.data)
    })()
  }

  return (
    <div className='flex justify-center items-center gap-[10px]'>
      <Form
        className='p-0 row'
        methods={methods}
      >
        <Select
          control={methods.control}
          name="search-type"
          placeholder='Tipo de pesquisa'
          loading
          items={[
            {
              label: 'Autor',
              value: 'author'
            },
            {
              label: 'Tag',
              value: 'tags'
            }
          ]}
        />
        <SelectText
          control={methods.control}
          name="search-item"
          placeholder='Digite sua pesquisa'
          loading
          items={[]}
        />
        <Button.Tertiary
          type='submit'
          icon={<Search className='w-full h-full' />}
          onClick={submit}
          disabled={!isValid || isValidating || isSubmitting}
        />
      </Form>
    </div>
  )
}
