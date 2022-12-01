import React, { createContext, useEffect, useState } from 'react'
import { AuthContextProps, AuthProviderProps, UserProps } from '@types'
import { getUserLocalStorage, LoginRequest, setUserLocalStorage, SignUpRequest } from './utils'

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>()

  async function authenticate (email: string, password: string) {
    const response = await LoginRequest(email, password)

    if (response.error) {
      return response.error.message
    }

    const payload = { token: response.token, email: response.user.userEmail }

    setUser(payload)
    setUserLocalStorage(payload)
    return null
  }

  function logout () {
    setUser(null)
    setUserLocalStorage(null)
  }

  async function signup (email: string, password: string, username: string) {
    const response = await SignUpRequest(email, password, username, 'This is a dummy description, change if you want')

    if (response.error) {
      return response.error.message
    }

    const payload = { token: response.token, email: response.user.userEmail }

    console.log(payload)

    setUser(payload)
    setUserLocalStorage(payload)
    return null
  }

  useEffect(() => {
    const user = getUserLocalStorage()

    if (user) {
      setUser(user)
    }
  }, [])

  return (
        <AuthContext.Provider
            value={{
              ...user,
              authenticate,
              signup,
              logout
            }}
        >
            {children}
        </AuthContext.Provider>
  )
}
