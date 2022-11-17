import React, { ChangeEvent, Context, createContext, forwardRef, Provider, ReactNode, useImperativeHandle, useState } from 'react'

export interface FormContextProps {
  values: {}
  errors: {}
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
}

export interface FormImperativeHandleProps {
  handleOnChange?: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
}

export interface FormProviderProps {
  children: Provider<FormContextProps>
  initialValues: {}
  validationSchema: Object
}

export const FormContext = createContext<FormContextProps>({} as FormContextProps)

export const FormProvider = forwardRef<FormImperativeHandleProps, FormProviderProps>(({ children, initialValues, validationSchema }, formRef) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  async function handleOnChange (e: ChangeEvent<HTMLInputElement>) {
    const { name, type, checked, value } = e.target

    const inputValue = type === 'checkbox' ? checked : value

    console.log(name, inputValue)

    setValues((data: Object) => ({ ...data, [name]: inputValue }))
  }

  //   function setValueFields (field: string, value: string) {
  //     setValues((data: object) => ({ ...data, [field]: value }))
  //   }

  //   function setValuesFields (values: object) {
  //     setValues((data: object) => ({ ...data, ...values }))
  //   }

  //   function setErrorField (field: string, value: string) {
  //     setErrors((data: object) => ({ ...data, [field]: value }))
  //   }

  //   function setErrorsFields (values: object) {
  //     setErrors((data: object) => ({ ...data, ...values }))
  //   }

  useImperativeHandle(formRef, () => ({
    handleOnChange
  }))

  return (
        <FormContext.Provider
        value={{
          values,
          errors,
          handleOnChange
        }}
        >
            {children}
        </FormContext.Provider>
  )
})
