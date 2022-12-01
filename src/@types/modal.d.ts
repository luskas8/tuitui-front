import { ReactNode } from 'react'

export interface Values {
  onFadeClick?: 'close' | 'none'
  header: {
    closable?: boolean
    title: string
  }
  content: string
  footer?: {
    buttons: ReactNode[]
  }
}
