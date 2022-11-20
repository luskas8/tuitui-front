import classnames from 'classnames'
import React, { useState } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'
import { ReactComponent as Helper } from '@assets/icons/Exclamation-Circle.svg'
import { ReactComponent as Search } from '@assets/icons/Search.svg'
import ReactTolltip from 'react-tooltip'

interface Item {
  label: string
  value: string
}

interface SelectProps {
  control: Control
  name: string
  loading?: boolean
  icon?: boolean
  disabled?: boolean
  helper?: string[]
  placeholder: string
  items: Item[]
}

export function Select ({ control, name, ...rest }: SelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: 'Campo obrigatório'
      }}
      render={({
        field: { ref, onChange, value, onBlur },
        fieldState: { error }
      }) => {
        return <SelectItem
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

interface SelectItemProps {
  name: string
  placeholder: string
  value: any
  error: FieldError | undefined
  label?: string
  loading?: boolean
  icon?: boolean
  disabled?: boolean
  helper?: string[]
  items: Item[]
  onBlur: () => void
  onChange: (...event: any[]) => void
}

function SelectItem ({ name, value, label, disabled, icon, helper, error, items, placeholder, onBlur, onChange }: SelectItemProps) {
  const [defaultValue, updateSelectValue] = useState(value)
  const [isOpen, toggleCollapseState] = useState(false)

  function handleOptionClick (item: Item) {
    onChange({
      target: {
        name,
        type: 'input',
        value: item.value
      }
    })

    updateSelectValue(item.label)
    toggleCollapseState(false)
  }

  return (
    <div className="w-44 relative">
      <label onBlur={onBlur} className="w-full flex gap-2 py-2 flex-col items-start cursor-pointer" onClick={() => toggleCollapseState(state => !state)}>
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
            'outline-purple': isOpen,
            outline: isOpen,
            'outline-4': isOpen
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            // disabled: loading || disabled
          })}>
              <span className={classnames('w-full font-medium text-s order-1 flex gap-[10px] justify-between items-center border-none outline-none disabled:bg-white', {
                'text-slate-400': !value
              })}>
                <span className='w-full whitespace-nowrap text-ellipsis overflow-hidden'>{defaultValue || placeholder}</span>
                <div className='w-4 h-4 flex justify-center items-center text-ellipsis'>
                  <Search width="100%" height="100%" />
                </div>
              </span>
          </div>
          {/* {error && (
              <div className='flex-none order- self-stretch flex-grow-0'>
                  <p className='font-normal text-sm flex items-center text-red-600'>
                      {String(error?.message)}
                  </p>
              </div>
          )} */}
      </label>
      {isOpen && (
        <ul className='z-50 absolute mt-[0.625rem] rounded-lg w-full bg-white flex flex-col p-4 drop-shadow-lg'>
          {items.map((item, index) => {
            return (
              <li className='cursor-pointer hover:bg-slate-300 pt-3 px-3 pb-[9px]' key={`select-item-${index}`} onClick={() => handleOptionClick(item)} >{item.label}</li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
