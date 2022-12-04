export interface Article {
  _id: string
  author: {
    _id: string
    username: string
  }
  title: string
  content: string
  tags?: string[]
}
