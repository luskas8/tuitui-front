import { ReactNode } from 'react'

export interface UserProps {
  email?: string
  token?: string
  id?: string
  username?: string
}

export interface AuthContextProps extends UserProps {
  loading: boolean
  authenticate: (email: string, password: string) => Promise<string | null>
  signup: (email: string, password: string, username: string) => Promise<string | null>
  logout: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}
