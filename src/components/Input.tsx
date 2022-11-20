import classnames from 'classnames'
import React, { InputHTMLAttributes, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ReactComponent as Helper } from '@assets/icons/Exclamation-Circle.svg'
import ReactTolltip from 'react-tooltip'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  loading?: boolean
  label?: string
  icon?: boolean
  caption?: boolean
  isRequired?: string
  helper?: string[]
  classNameSize?: string
}

export default function Input ({ caption = true, type, icon = false, helper, label, loading = false, name, isRequired, placeholder, disabled = false, classNameSize }: InputProps) {
  const { register, formState: { errors } } = useFormContext()

  useEffect(() => {
    console.log(errors[name])
  })

  return (
        <div className={String('w-full').concat(String(classNameSize))}>
            <label className="w-full flex gap-2 py-2 flex-col items-start">
              {label && (
                <div className={classnames('flex flex-row gap-[6px] p-0 items-center cursor-pointer text-black tuitui-input', { disabled })}>
                    <p className='font-medium text-sm flex-none -order-none flex-grow-0'>{label}</p>
                    {icon && (
                        <div data-tip='' data-for='helper' className='w-4 h-4 flex justify-center items-center'>
                            <Helper className='fill-slate-500' width="100%" height="100%" />
                            <ReactTolltip id='helper' effect='solid' className='max-w-[210px] font-normal text-sm'>
                                {helper?.map((help, index) => <p key={index}>{String(help)}</p>)}
                            </ReactTolltip>
                        </div>
                    )}
                </div>
              )}
                <div className={classnames('w-full text-sm font-normal flex flex-row items-center px-2 py-[12px] gap-[8px]bg-white border border-solid border-dark-gray rounded-sm tuitui-input--block focus-within:border-purple focus-within:outline-purple focus-within:outline focus-within:outline-4', {
                  error: errors[name],
                  disabled: loading || disabled
                })}>
                    <input className='w-full font-medium text-s order-1 flex items-center border-none outline-none disabled:bg-white'
                        placeholder={placeholder}
                        type={type}
                        disabled={loading}
                        {...register(name, {
                          disabled: loading || disabled,
                          required: isRequired
                        })}
                    />
                </div>
                {caption && errors[name] && (
                    <div className='flex-none order- self-stretch flex-grow-0'>
                        <p className='font-normal text-sm flex items-center text-red-600'>
                            {String(errors[name]?.message)}
                        </p>
                    </div>
                )}
            </label>
        </div>
  )
}
