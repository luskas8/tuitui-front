import classnames from 'classnames'
import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'
import { ReactComponent as Helper } from '@assets/icons/Exclamation-Circle.svg'
import ReactTolltip from 'react-tooltip'
import { Rules } from '@types'

interface InputItemProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  onChange: (...event: any[]) => void
  loading?: boolean
  label?: string
  icon?: boolean
  error: FieldError | undefined
  caption?: boolean
  captionText?: string
  isRequired?: string
  helper?: string[]
  classNameSize?: string
  rules?: Rules
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  control: Control
  loading?: boolean
  label?: string
  icon?: boolean
  caption?: boolean
  captionText?: string
  isRequired?: string
  helper?: string[]
  classNameSize?: string
  rules?: Rules
}

export default function Input ({ isRequired, control, name, rules, ...rest }: InputProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        required: isRequired
      }}
      render={({
        field: { ref, onChange, value, onBlur },
        fieldState: { error }
      }) => {
        return <Input.Item
          name={name}
          value={value}
          error={error}
          onBlur={onBlur}
          onChange={onChange}
          {...rest}
        />
      }}
    />
  )
}

Input.Item = ({ value, error, caption = true, type, icon = false, helper, label, loading = false, name, isRequired, placeholder, disabled = false, classNameSize, onChange }: InputItemProps) => {
  function handleChance (event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    onChange({
      target: {
        name,
        type: 'input',
        value
      }
    })
  }

  return (
        <div className={String('w-full ').concat(String(classNameSize ?? ''))}>
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
                  error,
                  disabled: loading || disabled
                })}>
                    <input className='w-full font-medium text-s order-1 flex items-center border-none outline-none disabled:bg-white'
                        placeholder={placeholder}
                        type={type}
                        disabled={loading}
                        value={value ?? ''}
                        onChange={handleChance}
                    />
                </div>
                {caption && error && (
                    <div className='flex-none order- self-stretch flex-grow-0'>
                        <p className='font-normal text-sm flex items-center text-red-600'>
                            {String(error?.message)}
                        </p>
                    </div>
                )}
            </label>
        </div>
  )
}

Input.Text = ({ isRequired, control, name, rules, ...rest }: InputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        required: isRequired
      }}
      render={({
        field: { ref, onChange, value, onBlur },
        fieldState: { error }
      }) => {
        return <Input.TextItem
          name={name}
          value={value}
          error={error}
          onBlur={onBlur}
          onChange={onChange}
          {...rest}
        />
      }}
    />
  )
}

Input.TextItem = ({ value, error, caption = true, icon = false, helper, label, loading = false, name, isRequired, placeholder, disabled = false, classNameSize, onChange, captionText }: InputItemProps) => {
  const [maxLength, updateMaxLenght] = useState(false)

  function handleChance (event: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target

    if (value.length > 5000) {
      updateMaxLenght(true)
      return
    }

    updateMaxLenght(false)
    onChange({
      target: {
        name,
        type: 'input',
        value
      }
    })
  }

  return (
        <div className={String('w-full ').concat(String(classNameSize ?? ''))}>
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
                <div className={classnames('w-full text-sm font-normal flex flex-row-reverse px-2 py-[12px] gap-[8px]bg-white border border-solid border-dark-gray rounded-sm tuitui-input--block focus-within:border-purple focus-within:outline-purple focus-within:outline focus-within:outline-4', {
                  error,
                  disabled: loading || disabled
                })}>
                    <textarea
                      className='w-full h-52 font-medium text-s order-1 flex items-center border-none outline-none disabled:bg-white'
                      placeholder={placeholder}
                      disabled={loading}
                      value={value ?? ''}
                      onChange={handleChance}
                    />
                    {maxLength && (
                      <div className='w-4 h-4 flex justify-center items-center'>
                        <Helper className='fill-blue' width="100%" height="100%" />
                      </div>
                    )}
                </div>
                {(caption || error) && (
                    <div className='flex-none order-1 self-stretch flex-grow-0'>
                        <p className={classnames('font-normal text-sm flex items-center', {
                          'text-red-600': error,
                          'text-slate-500': caption && !error
                        })}>
                            {!error ? maxLength ? 'Limite de caracteres atingindo' : captionText : String(error?.message)}
                        </p>
                    </div>
                )}
            </label>
        </div>
  )
}
