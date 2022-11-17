import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/Authorization'
import { routes } from './Routes'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={routes}/>
        </AuthProvider>
  </React.StrictMode>
)
