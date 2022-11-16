import React, { createContext, useEffect, useState } from 'react'
import { AuthContextProps, AuthProviderProps, UserProps } from '../../@types/authorization'
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from './utils'

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>()

  async function authenticate (email: string, password: string) {
    const response = await LoginRequest(email, password)

    const payload = { token: response.token, email: response.user.email }

    setUser(payload)
    setUserLocalStorage(payload)
  }

  function logout () {
    setUser(null)
    setUserLocalStorage(null)
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
              logout
            }}
        >
            {children}
        </AuthContext.Provider>
  )
}
