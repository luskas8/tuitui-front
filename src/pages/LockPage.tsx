import { NavigationProvider } from '@contexts/Navigation'
import { useAuth } from '@hooks/useAuth'
import React from 'react'
import { Outlet } from 'react-router-dom'

export function LockPage () {
  const { email } = useAuth()

  // if (!email) {
  //   return <h1>Not logged!</h1>
  // }
  return (
    <NavigationProvider>
      <Outlet />
    </NavigationProvider>
  )
}
