import React from 'react'
import { AlertProvider } from '@contexts/Alert'
import { AuthProvider } from '@contexts/Authorization'
import { ModalProvider } from '@contexts/Modal'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Routes'

import './styles/global.css'
import '@mui/styled-engine'

export function App () {
  return (
    <AuthProvider>
      <AlertProvider>
        <ModalProvider>
          <RouterProvider router={routes}/>
        </ModalProvider>
      </AlertProvider>
  </AuthProvider>
  )
}
