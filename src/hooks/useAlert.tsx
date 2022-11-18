import { useContext } from 'react'
import { AlertContext } from '@contexts/Alert'

export function useAlert () {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error('Alert context error!')
  }

  return context
}
