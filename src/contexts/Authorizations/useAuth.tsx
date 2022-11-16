import { useContext } from 'react'
import { AuthContext } from '.'

export function useAuth () {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Authorization error!')
  }

  return context
}
