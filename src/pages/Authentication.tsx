import { NavigationProvider } from '@contexts/Navigation'
import { useAuth } from '@hooks/useAuth'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { LoadSpinner } from '@components/Loading'

export function Authentication () {
  const { token, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !token) {
      navigate('/?code=401')
    }
  }, [loading, token])

  if (loading) {
    return <LoadSpinner />
  }

  return (
    <NavigationProvider>
      <Outlet />
    </NavigationProvider>
  )
}
