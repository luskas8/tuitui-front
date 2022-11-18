import React, { createContext, ReactNode, useState } from 'react'

type Child = ReactNode[]

interface NavigationContextProps {
  actionsArea: Child
  mainArea: Child
  setActions: (actions: Child) => void
  setMainArea: (main: Child) => void
}

export const NavigationContext = createContext<NavigationContextProps>({} as NavigationContextProps)

interface NavigationProviderProps {
  children: ReactNode
}

export function NavigationProvider ({ children }: NavigationProviderProps) {
  const [actionsArea, updateActions] = useState<Child>([])
  const [mainArea, setMainArea] = useState<Child>([])

  function setActions (actions: Child) {
    updateActions(actions)
  }

  return (
    <NavigationContext.Provider
      value={{
        actionsArea,
        setActions,
        mainArea,
        setMainArea
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
