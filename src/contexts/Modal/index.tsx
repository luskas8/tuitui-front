import { Modal } from '@components/Modal'
import { VisibilityState, Values } from '@types'
import _ from 'lodash'
import React, { createContext, ReactNode, useState } from 'react'

interface ModalContextProps {
  visibility: VisibilityState
  values: Values
  setVisibility: (state: VisibilityState) => void
  setValues: (values: Values) => void
  setValuesNShow: (values: Values) => void
}

const initialValues: Values = {
  onFadeClick: 'none',
  header: {
    title: '',
    closable: true
  },
  content: ''
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider ({ children }: ModalProviderProps) {
  const [visibility, updateVisibility] = useState<VisibilityState>('hidden')
  const [values, updateValues] = useState<Values>(initialValues)

  function setVisibility (newState: VisibilityState) {
    updateVisibility(newState)
  }

  function setValues (newValues: Values) {
    const mergedValues = _.merge(values, newValues)
    // console.log('merge', mergedValues)
    updateValues(mergedValues)
  }

  function setValuesNShow (newValues: Values) {
    setValues(newValues)
    setVisibility('visible')
  }

  return (
    <ModalContext.Provider
    value={{
      values,
      visibility,
      setValues,
      setValuesNShow,
      setVisibility
    }}>
      <Modal setVisibility={setVisibility} visibility={visibility} values={values} />
      {children}
    </ModalContext.Provider>
  )
}
