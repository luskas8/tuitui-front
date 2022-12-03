import React from 'react'
import { ReactComponent as Branding } from '@assets/branding/branding.svg'
import { ReactComponent as User } from '@assets/icons/User.svg'
import { Button } from './Button'
import { useNavigation } from '@hooks/useNavigation'
import { useAuth } from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function Navigation () {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { actionsArea, mainArea } = useNavigation()

  function handleSignOut () {
    logout()
    navigate('/')
  }

  return (
    <div className='w-full h-16 bg-white'>
      <div className='w-full h-full flex justify-between items-center'>
        <div data-name='logo-area' className='h-full py-2 pr-[1px] pl-4'>
          <Branding width="100%" height="100%" />
        </div>
        <div data-name='action-area' className='flex items-center w-full h-full'>
          <div className='self-center w-full h-full'>{mainArea}</div>
          <div className='self-center w-auto h-full px-1 flex gap-2 justify-center items-center'>{actionsArea}</div>
        </div>
        <div data-name='user-area' className='w-36 max-h-12'>
          <Button.Tertiary
            className='h-full small inline-block'
            title='Deslogar'
            icon={<User className='w-full h-full' />}
            onClick={handleSignOut}
          />
        </div>
      </div>
    </div>
  )
}
