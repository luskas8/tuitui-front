import React, { ReactNode } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { ReactComponent as Helper } from '../assets/icons/Exclamation-Circle.svg'

interface FormProps {
  methods: UseFormReturn<FieldValues, any>
  onSubmit: (data: any) => void
  children: ReactNode
}

export function Form ({ methods, onSubmit, children }: FormProps) {
  const { formState: { isValid, isSubmitted } } = methods

  return (
        <FormProvider
            {...methods}
        >
            <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={methods.handleSubmit(onSubmit)}
                className='w-full flex flex-col justify-center items-start gap-2 p-3'
            >
                {!isValid && isSubmitted && (
                    <div className='w-full flex justify-start gap-6 items-start px-4 py-2 border border-solid border-red-600 bg-red-600 text-white'>
                        <div className='w-5 flex flex-col h-full items-center py-1'>
                            <Helper className='fill-white' width='100%' height='100%' />
                        </div>
                        <div className='py-1 flex flex-col items-start font-normal'>
                            <h1 className='text-base'>Erro</h1>
                            <p className='text-sm'>Campo obrigatório</p>
                        </div>
                    </div>
                )}
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
