import React from 'react'
import { ReactComponent as ArrowLeft } from '@assets/icons/ArrowLeft.svg'
import { ReactComponent as Search } from '@assets/icons/Search.svg'
import { ReactComponent as Edit } from '@assets/icons/Edit.svg'
import { ReactComponent as DeleteOutlined } from '@assets/icons/DeleteOutlined.svg'
import { ReactComponent as Sad } from '@assets/icons/Sad.svg'
import { Button } from './Button'
import { Markup } from 'react-render-markup'
import { Article as ArticleType, ArticleTags } from '@types'
import { useNavigate } from 'react-router-dom'
import { useModal } from '@hooks/useModal'
import { useAuth } from '@hooks/useAuth'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export function Article ({ author, content, tags, title, _id }: ArticleType) {
  const { id } = useAuth()
  const navigate = useNavigate()
  const { setValuesNShow } = useModal()

  function handleBackClick () {
    navigate(-1)
  }

  function handleDeleteArticle () {
    setValuesNShow({
      onFadeClick: 'close',
      header: {
        title: 'Confirmação de ação'
      },
      content: 'Você deseja mesmo excluir essa publicação?',
      footer: {
        buttons: [
          <Button
            key="delete-button-confirm"
            className="small danger"
            title="Confirmar"
            onClick={() => {}}
          />
        ]
      }
    })
  }

  function handleEditArticle () {
    navigate(`/app/edit/${_id}`)
  }

  return (
    <article className="tuitui-article--preview w-full h-full rounded-lg bg-white py-[5px] px-2 overflow-hidden">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-[10px]">
          <Button.Tertiary
            onClick={handleBackClick}
            className="small"
            icon={<ArrowLeft className="w-full h-full" />}
          />
          <h1 className="first-letter:capitalize font-medium text-base text-black">
            {title}
          </h1>
        </div>
        {id && id === author._id && (
          <div className="flex gap-[5px]">
            <Button
              className="small"
              title="Editar"
              icon={<Edit className="w-full h-full" />}
              onClick={handleEditArticle}
            />
            <Button.Secondary
              className="small danger"
              title="Excluir"
              icon={<DeleteOutlined className="w-full h-full" />}
              onClick={handleDeleteArticle}
            />
          </div>
        )}
      </header>
      {tags && !!tags.length && (
        <section
          data-name="tags"
          className="w-full h-fit py-[10px] flex gap-[5px] flex-wrap"
        >
          {tags.map(({ tagName }: ArticleTags, index: number) => {
            return (
              <div
                key={`article-tag-${index}`}
                className="w-fit px-[6px] py-2 bg-blue rounded-[4px] text-white font-medium first-letter:uppercase"
              >
                {tagName}
              </div>
            )
          })}
        </section>
      )}
      <main className="flex flex-col gap-[10px] h-full text-ellipsis overflow-hidden">
        <section className="w-full flex gap-[10px] items-center">
          <span className="font-normal text-sm text-slate-400">
            {author.username}
          </span>
          {/* <time className='font-normal text-xs text-slate-400'>14:10</time> */}
        </section>
        <main className="tuitui-article-content w-full h-full font-medium text-sm text-justify text-black">
          <Markup markup={DOMPurify.sanitize(marked.parse(content))} />
        </main>
      </main>
    </article>
  )
}

interface ArticleContainerProps {
  articles: ArticleType[]
}

Article.Container = ({ articles }: ArticleContainerProps) => {
  if (!articles.length) {
    return (
      <div className="w-full h-60 bg-white drop-shadow-lg flex flex-col gap-4 justify-center items-center rounded-sm">
        <h1 className="w-32 h-32">
          <Sad width="100%" height="100%" />
        </h1>
        <h2 className="flex flex-col items-center font-medium text-sm">
          <span>Ops... Não econtramos nada</span>
          <span>Que tal uma pesquisa diferente?</span>
        </h2>
      </div>
    )
  }

  return (
    <section className="w-full h-full block">
      {articles.map((article, index) => {
        return <Article.Preview key={`article-${article._id}`} {...article} />
      })}
    </section>
  )
}

Article.Preview = ({ author, content, title, _id }: ArticleType) => {
  const navigate = useNavigate()

  function handleReadMore () {
    navigate(`/app/view/${author._id}/${_id}`)
  }

  return (
    <article className="tuitui-article--preview w-full h-40 rounded-lg bg-white py-[5px] px-2 overflow-hidden">
      <header className="flex justify-between items-center">
        <h1 className="first-letter:capitalize font-medium text-base text-black">
          {title}
        </h1>
        <Button
          className="small info"
          title="Ler mais"
          icon={<Search className="w-full h-full" />}
          onClick={handleReadMore}
        />
      </header>
      <main className="flex flex-col gap-[10px] h-full text-ellipsis overflow-hidden">
        <section className="w-full flex gap-[10px] items-center">
          <span className="font-normal text-sm text-slate-400">
            {author.username}
          </span>
          {/* <time className='font-normal text-xs text-slate-400'>14:10</time> */}
        </section>
        <main className="tuitui-article-content w-full h-full font-medium text-sm text-justify text-transparent bg-clip-text bg-gradient-to-b from-gray via-white">
          <Markup markup={DOMPurify.sanitize(marked.parse(content))} />
        </main>
      </main>
    </article>
  )
}
