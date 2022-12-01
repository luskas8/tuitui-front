import { UserProps } from '@types'
import { Api } from '@services/api'

export async function LoginRequest (email: string, password: string) {
  try {
    const request = await Api.post('/users/signin', { userEmail: email, password })

    return request.data
  } catch (error: any) {
    return { error: error.response.data }
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

export async function SignUpRequest (email: string, password: string, username: string, description = 'This is a dummy description, change if you want') {
  try {
    const request = await Api.post('/users/signup', { userEmail: email, password, username, description })

    return request.data
  } catch (error: any) {
    return { error: error.response.data }
  }
}
