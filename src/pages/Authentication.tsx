import { NavigationProvider } from '@contexts/Navigation'
import { useAuth } from '@hooks/useAuth'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function Authentication () {
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/?code=401')
    }
  }, [])

  if (!token) {
    return null
  }

  return (
    <NavigationProvider>
      <Outlet />
    </NavigationProvider>
  )
}
