import React, { createContext, useEffect, useState } from 'react'
import { AuthContextProps, AuthProviderProps, UserProps } from '@types'
import { getUserLocalStorage, LoginRequest, setUserLocalStorage, SignUpRequest } from './utils'

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [loading, updateLoadState] = useState(false)
  const [user, setUser] = useState<UserProps | null>()

  async function authenticate (email: string, password: string) {
    updateLoadState(true)
    const response = await LoginRequest(email, password)

    if (response.error) {
      return response.error.message
    }

    const payload = { token: response.token, email: response.user.userEmail, id: response.user._id }

    setUser(payload)
    setUserLocalStorage(payload)

    setTimeout(() => {
      updateLoadState(false)
    }, 1500)
    return null
  }

  function logout () {
    updateLoadState(true)

    setUser(null)
    setUserLocalStorage(null)

    setTimeout(() => {
      updateLoadState(false)
    }, 1000)
  }

  async function signup (email: string, password: string, username: string) {
    const response = await SignUpRequest(email, password, username, 'This is a dummy description, change if you want')

    if (response.error) {
      return response.error.message
    }

    const payload = { token: response.token, email: response.user.userEmail }

    setUser(payload)
    setUserLocalStorage(payload)
    return null
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async function fetchUser () {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises, no-new
      new Promise<void>((resolve) => {
        updateLoadState(true)
        const user = getUserLocalStorage()

        if (user) {
          setUser(user)
        }
        resolve()
      })
    })()
    setTimeout(() => {
      updateLoadState(false)
    }, 1300)
  }, [])

  return (
        <AuthContext.Provider
            value={{
              ...user,
              loading,
              authenticate,
              signup,
              logout
            }}
        >
            {children}
        </AuthContext.Provider>
  )
}
