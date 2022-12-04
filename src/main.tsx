import { AlertProvider } from '@contexts/Alert'
import { ModalProvider } from '@contexts/Modal'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/Authorization'
import { routes } from './Routes'
import './styles/global.css'
import '@mui/styled-engine'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <AuthProvider>
            <AlertProvider>
              <ModalProvider>
                <RouterProvider router={routes}/>
              </ModalProvider>
            </AlertProvider>
        </AuthProvider>
  </React.StrictMode>
)
