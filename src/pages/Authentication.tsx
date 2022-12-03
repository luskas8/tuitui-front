import { NavigationProvider } from '@contexts/Navigation'
import { ReactComponent as Loading } from '@assets/icons/Loading.svg'
import { useAuth } from '@hooks/useAuth'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function Authentication () {
  const { token, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !token) {
      navigate('/?code=401')
    }
  }, [loading, token])

  if (loading) {
    return <div className='w-full h-screen flex flex-col gap-3 justify-center items-center'>
      <Loading className='animate-spin h-20 w-20 mr-3' />
      <h1 className='text-lg font-medium'>buscando seus dados, aguarde por favor</h1>
    </div>
  }

  return (
    <NavigationProvider>
      <Outlet />
    </NavigationProvider>
  )
}
