import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { ReactComponent as Helper } from '@assets/icons/Exclamation-Circle.svg'

type State = 'VISIBLE' | 'HIDDEN'

interface AlertContextProps {
  setVisibility: (state: State) => void
  setMessage: (message: string) => void
}

export const AlertContext = createContext<AlertContextProps>({} as AlertContextProps)

interface AlertProviderProps {
  children: ReactNode
}

export function AlertProvider ({ children }: AlertProviderProps) {
  const [visibility, updateVisibility] = useState<boolean>(false)
  const [message, updateMessage] = useState<string>('')

  function setVisibility (state: State) {
    updateVisibility(state === 'VISIBLE')
  }
  function setMessage (message: string) {
    updateMessage(message)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      updateVisibility(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [visibility])

  return (
        <AlertContext.Provider
            value={{
              setVisibility,
              setMessage
            }}
        >
          <div className='relative w-full h-full'>
            {visibility && (
                  <div className='absolute top-5 left-3 drop-shadow-md rounded-sm w-64 bg-red-600 text-white'>
                    <div className='flex justify-start gap-6 items-start px-4 py-2'>
                      <div className='w-5 flex flex-col h-full items-center py-1'>
                          <Helper className='fill-white' width='100%' height='100%' />
                      </div>
                      <div className='py-1 flex flex-col items-start font-normal'>
                          <h1 className='text-base'>Erro</h1>
                          <p className='text-sm'>{message}</p>
                      </div>
                    </div>
                </div>
            )}
            {children}
          </div>
        </AlertContext.Provider>
  )
}
