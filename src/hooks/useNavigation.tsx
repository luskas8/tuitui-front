import { useContext } from 'react'
import { NavigationContext } from '@contexts/Navigation'

export function useNavigation () {
  const context = useContext(NavigationContext)

  if (!context) {
    throw new Error('Navigation context error!')
  }

  return context
}
