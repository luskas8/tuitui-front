import { UserProps } from '@types'
import { Api } from '@services/api'

export async function LoginRequest (email: string, password: string) {
  try {
    const request = await Api.post('/users/signin', { userEmail: email, password })

    if (request.status !== 200) {
      return { error: request.data }
    }

    return request.data
  } catch (error: any) {
    console.log({ error })
    return { error: error.data }
  }
}

export function setUserLocalStorage (user: UserProps | null) {
  localStorage.setItem('u_tuitui_v1', JSON.stringify(user))
}

export function getUserLocalStorage () {
  const json = localStorage.getItem('u_tuitui_v1')

  if (!json) {
    return null
  }

  const user = JSON.parse(json) as UserProps
  return user ?? null // mesmo que passe pela primeira verificação como algo inválido retorna nulo
}

export function destroyUserLocalStorage () {
  localStorage.removeItem('u_tuitui_v1')
}

export async function SignUpRequest (email: string, password: string, username: string, description = 'This is a dummy description, change if you want') {
  try {
    const request = await Api.post('/users/signup', { userEmail: email, password, username, description })

    return request.data
  } catch (error: any) {
    return { error: error.response.data }
  }
}
