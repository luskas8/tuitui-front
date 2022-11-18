import React from 'react'
import { ReactComponent as Branding } from '@assets/branding/branding.svg'
import { ReactComponent as User } from '@assets/icons/User.svg'
import { Button } from './Button'

export function Navigation () {
  return (
    <div className='w-full h-12 bg-white'>
      <div className='w-full h-full flex justify-between'>
        <div className='h-full py-2 pr-[1px] pl-4'>
          <Branding width="100%" height="100%" />
        </div>
        <div>
          button mid
        </div>
        <div className='max-h-12'>
          <Button.Tertiary
            className='h-full'
            title='Meu perfil'
            icon={<User className='fill-dark-blue py-1' />}
          />
        </div>
      </div>
    </div>
  )
}
