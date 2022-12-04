import { ReactComponent as FileText } from '@assets/icons/FileText.svg'
import { ReactComponent as Search } from '@assets/icons/Search.svg'
import { Article } from '@components/Article'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import Input from '@components/Input'
import { Select } from '@components/Select'
import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@hooks/useNavigation'
import Layout from '@layout'
import { Article as ArticleType } from '@types'
import { getAllArticles } from '@services/getAllArticles'
import { searchTags } from '@services/searchTags'
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
          navigate('/app/create/article')
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
  const [watchValues, setWatchValues] = useState<string | undefined>()
  const [tagList, updateTagList] = useState([])
  const { watch } = methods

  function handleWatch (value: { [x: string]: any }, name?: string, type?: string) {
    if (value['search-type']) {
      setWatchValues(value['search-type'])
    }
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => handleWatch(value, name, type))
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async function fetchTags () {
      updateTagList(await getTagList())
    })()
  }, [])

  useEffect(() => {
    console.log(tagList)
  }, [tagList])

  function submit (e: any) {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    methods.handleSubmit(async (data) => {
      const articles = await getAllArticles(data, token)
      updateArticle(articles.data)
    })()
  }

  async function getTagList () {
    const response: any = await searchTags(token)
    const tags = response.data.map((tag: any) => {
      return { label: tag.tagName, value: tag.tagName }
    })

    return tags
  }

  return (
    <div className='flex h-full justify-center items-center gap-[10px]'>
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
              label: 'Por autor',
              value: 'author'
            },
            {
              label: 'Por título',
              value: 'title'
            },
            {
              label: 'Por tag',
              value: 'tags'
            }
          ]}
        />
        {watchValues === 'tags'
          ? (
            <Select
              lg
              control={methods.control}
              name="search-item"
              placeholder='Digite sua pesquisa'
              loading
              items={tagList}
            />
            )
          : (
          <Input
            placeholder='Digite sua pesquisa'
            classNameSize='w-[320px]'
            control={methods.control}
            name="search-item"
            isRequired='Campo obrigatório'
            disabled={!watchValues}
            caption={false}
          />
            )}
        <Button.Tertiary
          type='submit'
          icon={<Search className='w-full h-full' />}
          onClick={submit}
        />
      </Form>
    </div>
  )
}
