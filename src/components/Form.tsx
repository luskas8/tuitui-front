import React, { FormEvent, forwardRef, LegacyRef, MutableRefObject, ReactNode, useEffect } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { useAlert } from '@hooks/useAlert'

interface FormProps {
  methods: UseFormReturn<FieldValues, any>
  onSubmit: (data: any) => void
  children: ReactNode
  className?: string
  ref?: MutableRefObject<any>
}

export const Form = forwardRef(({ methods, onSubmit, children, className }: FormProps, formRef) => {
  const { formState: { errors } } = methods
  const { setMessage, setVisibility } = useAlert()
  const error = Object.keys(errors).shift()

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    console.log('aaa')
    // e.preventDefault()
    // methods.handleSubmit(onSubmit)
  }

  useEffect(() => {
    if (error) {
      setMessage(String(errors[error]?.message))
      setVisibility('visible')
      return
    }
    setVisibility('hidden')
  }, [error])

  return (
        <FormProvider
            {...methods}
        >
            <form
                ref={formRef as LegacyRef<HTMLFormElement> | undefined}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit}
                className={String('tuitui-form w-full flex flex-col justify-center items-start gap-2 p-3 ').concat(String(className ?? ''))}
            >
                {children}
            </form>
        </FormProvider>
  )
})

interface FormGroupProps {
  title?: string
  children: ReactNode
}

export function FormGroup ({ title, children }: FormGroupProps) {
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

// FormGroupItem = ({ children }: FormGroupItemProps) => {
//   return (
//         <div className=''>
//             {children}
//         </div>
//   )
// }
