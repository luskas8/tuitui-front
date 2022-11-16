import { UserProps } from '../../@types/authorization'
import { Api } from '../../services/api'

export async function LoginRequest (email: string, password: string) {
  try {
    const request = await Api.post('/user/signin', { email, password })

    return request.data
  } catch (error) {
    return null
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

  const user = JSON.parse(json)
  return user ?? null // mesmo que passe pela primeira verificação como algo inválido retorna nulo
}
