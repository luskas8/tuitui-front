import { ReactComponent as Close } from '@assets/icons/Close.svg'
import { ReactComponent as Plus } from '@assets/icons/Plus.svg'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import Input from '@components/Input'
import { useNavigation } from '@hooks/useNavigation'
import Layout from '@layout'
import { Autocomplete, createFilterOptions, TextField } from '@mui/material'
import { createArticle } from '@services/createArticle'
import { ArticleCreateProps, ArticleTags, Item } from '@types'
import { getTagList } from '@utils/getTagList'
import { isString } from 'lodash'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const filter = createFilterOptions<Item>()
interface FormValues {
  title: string
  content: string
  tags?: ArticleTags[]
}

export function CreateArticle () {
  const [loading, setLoadingState] = useState(false)
  const [tags, updateTags] = useState<ArticleTags[]>([])
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
    navigate('/app/homepage')
  }

  function submit (e: any) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    methods.handleSubmit(async (data: FormValues) => {
      setLoadingState(true)
      const response: ArticleCreateProps = {
        title: data.title,
        content: data.content,
        tags: data.tags
      }
      await createArticle(response)
      // setTimeout(() => {
      setLoadingState(false)
      navigate('/app/homepage')
      // }, 800)
    })()
  }

  useEffect(() => {
    methods.setValue('tags', tags)
  }, [tags])

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
              tags={tags}
              updateTags={updateTags}
            />
          </div>
        </Form>
      </div>
    </Layout>
  )
}

interface TagControllerProps {
  tags: ArticleTags[]
  updateTags: Dispatch<SetStateAction<ArticleTags[]>>
}

function TagsController ({ tags, updateTags }: TagControllerProps) {
  const [addinTag, updateAddingState] = useState(false)
  const [optiontagList, updateOptionTagList] = useState<Item[]>([])

  function handleAddTag () {
    updateAddingState(true)
  }

  function blur () {
    updateAddingState(false)
  }

  function handleDelete (index: number) {
    const oldTags = tags.filter((_, idx) => idx !== index)
    updateTags(oldTags)
  }

  function addTag (tagName: string) {
    updateTags(tags => [...tags, { tagName }])
    updateAddingState(false)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async function fetchTags () {
      updateOptionTagList(await getTagList())
    })()
  }, [tags])

  return (
    <div className='flex gap-[5px] py-[10px]'>
      {tags.map((tag, index) => {
        return (
          <div
          key={`article-tag-${index}`}
          onClick={() => handleDelete(index)}
          className="flex gap-4 justify-center items-center cursor-pointer hover:bg-alter-blue active:bg-smooth-blue w-fit px-[6px] py-2 bg-blue rounded-[4px] text-white font-medium first-letter:uppercase"
        >
          <span>
            {tag.tagName}
          </span>
          <button className='flex justify-center items-center w-4 h-4 fill-white'>
            <Close className='w-full h-full' />
          </button>
        </div>
        )
      })}
      {!addinTag && (
        <div
          key='article-add-tag'
          onClick={handleAddTag}
          className="flex gap-4 justify-center items-center cursor-pointer hover:bg-slate-200 active:bg-zinc-300 w-fit px-[6px] py-2 bg-white border-[2px] border-solid border-slate-300 rounded-[4px] text-slate-400 font-medium first-letter:uppercase"
        >
          <span>
            Adicionar
          </span>
          <button className='flex justify-center items-center w-4 h-4 fill-slate-400'>
            <Plus className='w-full h-full' />
          </button>
        </div>
      )}
      {addinTag && <TagSelect onBlur={blur} addTag={addTag} tagList={optiontagList} placeholder="Selecione uma opção" />}
    </div>
  )
}

interface TagSelectProps {
  tagList: Item[]
  placeholder: string
  addTag: (tagName: string) => void
  onBlur: () => void
}

function TagSelect ({ tagList, placeholder, addTag, onBlur }: TagSelectProps) {
  function handleOnChange (event: any, value: any) {
    if (value && !isString(value)) {
      addTag(value.value)
    }
  }

  return (
    <Autocomplete
      onBlur={onBlur}
      options={tagList}
      onChange={handleOnChange}
      noOptionsText='Que tal criar novas tags!'
      filterOptions={(options, params) => {
        const filtered = filter(options, params)

        const { inputValue } = params
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.value)
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            value: inputValue,
            label: `Criar tag: "${inputValue}"`
          })
        }

        return filtered
      }}
      isOptionEqualToValue={(options, value) => options.value === value.value}
      sx={{ width: '240px', height: '46px', boxSizing: 'border-box', '& > .MuiFormControl-root': { height: '46px' }, '& .MuiOutlinedInput-root': { paddingBottom: 0, paddingTop: 0, height: '100%' } }}
      renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
    />
  )
}
