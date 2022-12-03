import classnames from 'classnames'
import React, { useState } from 'react'
import { Control, Controller, FieldError, useFormContext } from 'react-hook-form'
import { ReactComponent as Helper } from '@assets/icons/Exclamation-Circle.svg'
import { ReactComponent as Search } from '@assets/icons/Search.svg'
import ReactTolltip from 'react-tooltip'
import AsyncCreatableSelect from 'react-select/async-creatable'
import { useAuth } from '@hooks/useAuth'
import { searchSelect } from '@utils/searchSelect'

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

  function handleBlur (e: any) {
    toggleCollapseState(false)
  }

  return (
    <div className="w-44 relative">
      <label onBlur={handleBlur} className="w-full flex gap-2 py-2 flex-col items-start cursor-pointer" onClick={() => toggleCollapseState(state => !state)}>
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
              <span className={classnames('w-full font-normal text-sm order-1 flex gap-[10px] justify-between items-center border-none outline-none disabled:bg-white', {
                // 'text-slate-400': !value
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

export function SelectText ({ control, name, ...rest }: SelectProps) {
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
        return <SelectTextItem
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

function SelectTextItem ({ name, value, label, disabled, icon, helper, error, items, placeholder, onBlur, onChange }: SelectItemProps) {
  const { token } = useAuth()
  const { getValues } = useFormContext()
  const [isOpen, toggleCollapseState] = useState(false)

  function handleChance (event: any) {
    const { value } = event
    onChange({
      target: {
        name,
        type: 'input',
        value
      }
    })

    toggleCollapseState(false)
  }

  async function loadOptions (inputValue: string) {
    const value = getValues()['search-type']
    const response = await searchSelect(value ?? 'tags', inputValue, token)
    const data = response.data.map((item: any) => {
      return { value: item.tagName || item._id, label: item.username || item.tagName }
    })
    return data
  }

  function handleBlur () {
    toggleCollapseState(false)
  }

  function handleFocus (e: any) {
    toggleCollapseState(true)
  }

  return (
    <div className="tuitui-select-text w-44 relative">
      <label className="w-full flex gap-2 py-2 flex-col items-start cursor-pointer">
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
            error
          })}>
            <AsyncCreatableSelect
              menuIsOpen={isOpen}
              placeholder="Digite sua pesquisa"
              unstyled
              className='tuitui-select-container'
              classNamePrefix='tuitui-select'
              noOptionsMessage={() => <p>Sem opções</p>}
              formatCreateLabel={(value) => <p>{value}</p>}
              // defaultOptions
              loadOptions={loadOptions}
              onChange={handleChance}
              tabSelectsValue
              openMenuOnFocus
              onFocus={handleFocus}
              onMenuClose={handleBlur}
              blurInputOnSelect={false}
              onBlur={handleBlur}
            />
          </div>
      </label>
    </div>
  )
}
