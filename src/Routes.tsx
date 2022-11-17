import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Homepage } from './pages/Homepage'
import { SignIn } from './pages/SignIn'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/homepage',
    element: <Homepage />
  }
])
