import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { SignIn } from './pages/SignIn'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  }
])
