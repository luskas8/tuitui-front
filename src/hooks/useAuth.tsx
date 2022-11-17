import { useContext } from 'react'
import { AuthContext } from '@contexts/Authorization'

export function useAuth () {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Authorization error!')
  }

  return context
}
