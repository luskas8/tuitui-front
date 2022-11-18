import React, { createContext, ReactNode } from 'react'

export const NavigationContext = createContext({})

interface NavigationProviderProps {
  children: ReactNode
}

export function NavigationProvider ({ children }: NavigationProviderProps) {
  return (
    <NavigationContext.Provider
      value={{}}
    >
      {children}
    </NavigationContext.Provider>
  )
}
