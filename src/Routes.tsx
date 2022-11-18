import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Homepage } from '@pages/Homepage'
import { SignIn } from '@pages/SignIn'
import { SignUp } from '@pages/SignUp'
import { LockPage } from '@pages/LockPage'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/app',
    element: <LockPage />,
    children: [
      {
        path: 'homepage',
        element: <Homepage />
      }
    ]
  }
])
