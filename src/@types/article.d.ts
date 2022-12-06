export interface ArticleTags {
  tagName: string
}

export interface Article {
  _id: string
  author: {
    _id: string
    username: string
  }
  title: string
  content: string
  tags?: ArticleTags[]
}

export interface ArticlePutProps {
  articleId: string
  title: string
  content: string
  tags?: string
}

export interface ArticleCreateProps {
  title: string
  content: string
  tags?: string
}
