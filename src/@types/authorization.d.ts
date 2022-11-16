import { ReactNode } from 'react'

export interface UserProps {
  email?: string
  token?: string
}

export interface AuthContextProps extends UserProps {
  authenticate: (email: string, password: string) => Promise<void>
  logout: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}
