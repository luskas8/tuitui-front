import { ReactComponent as FileText } from '@assets/icons/FileText.svg'
import { ReactComponent as Search } from '@assets/icons/Search.svg'
import { Article } from '@components/Article'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import Input from '@components/Input'
import { Select } from '@components/Select'
import { useNavigation } from '@hooks/useNavigation'
import Layout from '@layout'
import { Article as ArticleType, Item } from '@types'
import { getAllArticles } from '@services/getAllArticles'
import { searchTags } from '@services/searchTags'
import React, { useEffect, useState } from 'react'
import { Control, Controller, FieldValues, useForm, useFormContext, UseFormReturn } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Autocomplete, TextField } from '@mui/material'
import { isString } from 'lodash'

interface FormValues {
  'search-type': string
  'search-item': string
}

export function Homepage () {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<ArticleType[]>([])
  const { setActions, setMainArea } = useNavigation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()
  const methods = useForm<FormValues | any>({
    defaultValues: {
      'search-type': searchParams.get('search-type') ?? '',
      'search-item': searchParams.get('search-item') ?? ''
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
  const [watchValues, setWatchValues] = useState<string | undefined>()
  const [tagList, updateTagList] = useState<Item[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, updateFilter] = useState<FormValues>({
    'search-type': searchParams.get('search-type') ?? '',
    'search-item': searchParams.get('search-item') ?? ''
  } as FormValues)
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
    methods.setValue('search-type', filter['search-item'])
    methods.setValue('search-type', filter['search-type']);

    // eslint-disable-next-line @typescript-eslint/func-call-spacing, @typescript-eslint/no-floating-promises
    (async function fetchSubimit () { await submit(filter, true) })()
  }, [filter])

  function onSubmit (e: any) {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    methods.handleSubmit(async (data) => await submit(data))()
  }

  async function submit (data: any, fromRefresh = false) {
    console.log('before', data)
    if (data['search-type'] === 'tags' && data['search-item'].value) {
      data['search-item'] = data['search-item'].value
    } else if (data['search-item'] === 'tags' && fromRefresh) {
      methods.setError('search-item', { message: 'Campo obrigatório' })
      return
    }
    console.log('after', data)
    setSearchParams(data)

    if (data['search-type'] !== '' && data['search-item'] !== '') {
      const articles = await getAllArticles(data)
      updateArticle(articles.data)
    }
  }

  async function getTagList () {
    const response: any = await searchTags()
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
          required='Campo obrigatório'
          loading
          defaultChange={() => {
            methods.setValue('search-item', '')
            methods.clearErrors()
          }}
          defaultValue={filter}
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
            <TagSelect control={methods.control} tagList={tagList} name="search-item" placeholder='Digite sua pesquisa' />
            )
          : (
          <Input
            placeholder='Digite sua pesquisa'
            classNameSize='w-[320px]'
            control={methods.control}
            name="search-item"
            isRequired='Campo obrigatório'
            disabled={!watchValues}
            defaultValue={filter['search-item']}
            caption={false}
          />
            )}
        <Button.Tertiary
          type='submit'
          icon={<Search className='w-full h-full' />}
          onClick={onSubmit}
        />
      </Form>
    </div>
  )
}

interface TagSelectProps {
  control: Control<any>
  tagList: Item[]
  name: string
  placeholder: string
}

function TagSelect ({ control, tagList, name, placeholder }: TagSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { name, onChange, value },
        fieldState: { error },
        formState: { errors }
      }) => {
        const { setError, clearErrors } = useFormContext()
        function handleOnChange (event: any, value: any) {
          onChange({
            target: {
              name,
              type: 'input',
              value
            }
          })
        }

        function handleBlur (e: any) {
          console.log(e.target.value)
          if (e.target.value === '' || e.target.value === null) {
            setError(name, { message: 'Campo obrigatório' })
          } else {
            clearErrors(name)
          }
        }
        return (
          <Autocomplete
              options={tagList}
              onChange={handleOnChange}
              value={isString(value) ? value ? { label: value, value } : null : value}
              isOptionEqualToValue={(options, value) => options.label === value.label && options.value === value.value}
              sx={{ width: '320px', height: '46px', boxSizing: 'border-box', '& > .MuiFormControl-root': { height: '46px' }, '& .MuiOutlinedInput-root': { paddingBottom: 0, paddingTop: 0, height: '100%' } }}
              renderInput={(params) => <TextField error={!!error} onBlur={handleBlur} {...params} name={name} placeholder={placeholder} />}
            />
        )
      }}
    />
  )
}
