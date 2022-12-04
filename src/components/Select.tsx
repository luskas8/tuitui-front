import React from 'react'
import { Control, Controller } from 'react-hook-form'
import SelectMultiple, { Select as CustomSelect } from './CustomSelect'

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
  lg?: boolean
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
        field: { onChange },
        fieldState: { error }
      }) => {
        return <CustomSelect
          name={name}
          error={error}
          onChange={onChange}
          {...rest}
        />
      }}
    />
  )
}

Select.Multi = ({ control, name, ...rest }: SelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: 'Campo obrigatório'
      }}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error }
      }) => {
        return <SelectMultiple
          name={name}
          error={error}
          onChange={onChange}
          {...rest}
        />
      }}
    />
  )
}
