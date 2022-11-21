import React from 'react'
import { ReactComponent as Search } from '@assets/icons/Search.svg'
import { ReactComponent as Sad } from '@assets/icons/Sad.svg'
import { Button } from './Button'
import { Article as ArticleType } from '@types'

export function Article () {
  return (
    <h1>ARTICLE COMPONENT</h1>
  )
}

interface ArticleContainerProps {
  articles: ArticleType[]
}

Article.Container = ({ articles }: ArticleContainerProps) => {
  if (!articles.length) {
    return (
      <div className='w-full h-60 bg-white drop-shadow-lg flex flex-col gap-4 justify-center items-center rounded-sm'>
        <h1 className='w-32 h-32'>
          <Sad width="100%" height="100%" />
        </h1>
        <h2 className='flex flex-col items-center font-medium text-sm'>
          <span>Ops... Não econtramos nada</span>
          <span>Que tal uma pesquisa diferente?</span>
        </h2>
      </div>
    )
  }

  return (
    <section className='w-full h-full block'>
      {articles.map((article, index) => {
        return <Article.Preview
          key={`article-${index}`}
          {...article}
        />
      })}
    </section>
  )
}

Article.Preview = ({ author, content, title }: ArticleType) => {
  return (
    <article className='tuitui-article--preview w-full h-40 rounded-lg bg-white py-[5px] px-2 overflow-hidden'>
      <header className='flex justify-between items-center'>
        <h1 className='first-letter:capitalize font-medium text-base text-black'>{title}</h1>
        <Button
        className='small info'
          title='Ler mais'
          icon={<Search className='w-full h-full' />}
        />
      </header>
      <main className='flex flex-col gap-[10px] h-full text-ellipsis overflow-hidden'>
        <section className='w-full flex gap-[10px] items-center'>
          <span className='font-normal text-sm'>{author}</span>
          <time className='font-normal text-xs text-slate-400'>14:10</time>
        </section>
        <main className='w-full h-full font-medium text-sm text-justify text-transparent bg-clip-text bg-gradient-to-b from-gray via-white'>
          {content}
        </main>
      </main>
    </article>
  )
}
