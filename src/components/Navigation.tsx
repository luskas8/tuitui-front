import React from 'react'
import { ReactComponent as Branding } from '@assets/branding/branding.svg'
import { ReactComponent as User } from '@assets/icons/User.svg'
import { Button } from './Button'
import { useNavigation } from '@hooks/useNavigation'
import { useAuth } from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuItem } from '@mui/material'

export function Navigation () {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const navigate = useNavigate()
  const { logout } = useAuth()
  const { actionsArea, mainArea } = useNavigation()

  function handleSignOut () {
    setAnchorEl(null)
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
        <div>
          <Button.Tertiary
            title='Meu perfil'
            id="tuitui-profile-button"
            aria-controls={open ? 'tuitui-profile-menu' : undefined}
            aria-expanded={open ? 'true' : 'false'}
            aria-haspopup="true"
            className='h-full small inline-block'
            icon={<User className='w-full h-full' />}
            onClick={handleClick}
          />
          <Menu
            id="tuitui-profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'tuitui-profile-button'
            }}
          >
            <MenuItem onClick={handleClose}>Mostrar perfil</MenuItem>
            <MenuItem onClick={handleSignOut}>Sair</MenuItem>
          </Menu>
        </div>
        </div>
      </div>
    </div>
  )
}
