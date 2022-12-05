import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Homepage } from '@pages/Homepage'
import { SignIn } from '@pages/SignIn'
import { SignUp } from '@pages/SignUp'
import { Authentication } from '@pages/Authentication'
import { Profile } from '@pages/Profile'
import { Article } from '@pages/Article'
import loader from '@utils/loader'
import { CreateArticle } from '@pages/CreateArticle'
import { EditeArticle } from '@pages/EditArticle'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  { // rota para proteção de autenticação em certas rotas
    path: '/app',
    element: <Authentication />,
    children: [
      {
        path: '',
        element: <></>,
        loader: () => {
          return loader('/app/homepage')
        }
      },
      {
        path: 'homepage',
        element: <Homepage />
      },
      { // rota para visualizar o perfil
        path: 'view/:userId',
        element: <Profile />
      },
      { // rota para visualizar o artigo
        path: 'view/:userId/:articleId',
        element: <Article />
      },
      { // rota para editar o artigo
        path: 'edit/:articleId',
        element: <EditeArticle />
      },
      { // rota para criar artigo
        path: 'create/article',
        element: <CreateArticle />
      }
    ]
  }
])
