import { useContext } from 'react'
import { FormContext } from '.'

export function useAuth () {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('Form context error!')
  }

  return context
}
