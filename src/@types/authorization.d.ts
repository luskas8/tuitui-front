import { ReactNode } from 'react'

export interface UserProps {
  email?: string
  token?: string
}

export interface AuthContextProps extends UserProps {
  authenticate: (email: string, password: string) => Promise<string | null>
  signup: (email: string, password: string, username: string) => Promise<string | null>
  logout: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}
