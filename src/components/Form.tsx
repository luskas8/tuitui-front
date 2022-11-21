import React, { ReactNode, useEffect } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { useAlert } from '@hooks/useAlert'

interface FormProps {
  methods: UseFormReturn<FieldValues, any>
  onSubmit: (data: any) => void
  children: ReactNode
  className?: string
}

export function Form ({ methods, onSubmit, children, className }: FormProps) {
  const { formState: { errors } } = methods
  const { setMessage, setVisibility } = useAlert()
  const error = Object.keys(errors).shift()

  useEffect(() => {
    if (error) {
      setMessage(String(errors[error]?.message))
      setVisibility('VISIBLE')
      return
    }
    setVisibility('HIDDEN')
  }, [error])

  return (
        <FormProvider
            {...methods}
        >
            <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={methods.handleSubmit(onSubmit)}
                className={String('tuitui-form w-full flex flex-col justify-center items-start gap-2 p-3 ').concat(String(className ?? ''))}
            >
                {children}
            </form>
        </FormProvider>
  )
}

interface FormGroupProps {
  title?: string
  children: ReactNode
}

Form.Group = ({ title, children }: FormGroupProps) => {
  return (
        <div className='w-full flex flex-col gap-2 items-start'>
            {title && <h2 className=''></h2>}
            {children}
        </div>
  )
}

// interface FormGroupItemProps {
//   children: ReactNode
// }

// Form.GroupItem = ({ children }: FormGroupItemProps) => {
//   return (
//         <div className=''>
//             {children}
//         </div>
//   )
// }
