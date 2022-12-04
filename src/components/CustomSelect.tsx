import React, { useEffect } from 'react'
import SelectUnstyled, {
  SelectUnstyledProps,
  SelectOption
} from '@mui/base/SelectUnstyled'
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled'
import PopperUnstyled from '@mui/base/PopperUnstyled'
import { styled } from '@mui/system'
import { MultiSelectUnstyled, MultiSelectUnstyledProps, SelectUnstyledRootSlotProps } from '@mui/base'
import { ReactComponent as Down } from '@assets/icons/Down.svg'
import classnames from 'classnames'
import { FieldError } from 'react-hook-form'
import { Item } from '@types'

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f'
}

const Button = React.forwardRef(function Button<TValue extends {}> (
  props: SelectUnstyledRootSlotProps<TValue>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <Down className='w-4 h-4' />
    </button>
  )
})

const StyledButton = styled(Button, { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-size: 0.875rem/* 14px */;
  line-height: 1.25rem/* 20px */;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 220px;
  padding: 12px;
  text-align: left;

  &:hover:not(:disabled) {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }
  `
)

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 16px;
  margin: 18px 0;
  width: 220px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `
)
const StyledMultiListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 16px;
  margin: 18px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `
)

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 0.75rem;
  border-radius: 4px;
  border-bottom: 9px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    --tw-bg-opacity: 1;
    background-color: rgb(0 180 216 / var(--tw-bg-opacity));
    color: #000000;
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    ---tw-text-opacity: 1;
    background: rgb(0 180 216 / var(--tw-bg-opacity));
    color: #000000;
  }

  &.${optionUnstyledClasses.disabled} {
    --tw-text-opacity: 1;
    color: rgb(203 213 225 / var(--tw-text-opacity));
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    --tw-bg-opacity: 1;
    background-color: rgb(203 213 225 / var(--tw-bg-opacity));
    color: #000000
  }
  `
)

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`

const CustomSelect = React.forwardRef(function CustomSelect<TValue extends Item> (
  props: SelectUnstyledProps<TValue>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots
  }

  return <SelectUnstyled {...props} ref={ref} slots={slots} />
})

function renderValue (option: SelectOption<Item> | null, placeholder: string, name: string, onChange: any) {
  useEffect(() => {
    onChange({
      target: {
        name,
        type: 'input',
        value: option?.value
      }
    })
  }, [option])

  if (option == null) {
    return <span className='font-normal text-sm text-slate-400'>{placeholder}</span>
  }

  return (
    <span className='font-normal text-sm text-black'>{option.label}</span>
  )
}

interface SelectProps {
  error?: FieldError
  onChange: any
  placeholder: string
  name: string
  items: Item[]
  lg?: boolean
}

export function Select ({ items, name, placeholder, error, onChange, lg }: SelectProps) {
  return (
    <CustomSelect
      className={classnames('flex justify-between rounded-sm bg-white border border-solid border-dark-gray focus-within:border-purple focus-within:outline-purple focus-within:outline focus-within:outline-4', {
        'border-red-600': error,
        'w-[320px]': lg
      })}
      placeholder={placeholder}
      renderValue={(option) => renderValue(option, placeholder, name, onChange)}
    >
      {items.map((item, index) => {
        return <StyledOption
            className={classnames('cursor-pointer hover:bg-slate-300 pt-3 px-3 pb-[9px]', { 'w-[220px]': lg })}
            key={`tuitui-select--${name}-option-${index}`}
            value={item.value}
          >
            {item.label}
          </StyledOption>
      })}
    </CustomSelect>
  )
}

interface RenderMultiValueProps {
  option: Array<SelectOption<Item>> | null
  placeholder: string
  name: string
  onChange: any
}

function renderMultiValue ({ name, onChange, option, placeholder }: RenderMultiValueProps) {
  useEffect(() => {
    const values = option?.map(item => item.value)
    onChange({
      target: {
        name,
        type: 'input',
        value: JSON.stringify(values)
      }
    })
  }, [option])

  if (!option?.length) {
    return <span className='font-normal text-sm text-slate-400'>{placeholder}</span>
  }

  return (
    <div className='overflow-hidden inline-block whitespace-nowrap'>
      {option.map((item, index) => {
        if (index === 0) {
          return <span key={`tuitui-select--${String(item.label)}-option-${index}`} className='font-normal text-sm text-black'>{item.label}</span>
        }
        return (
          <span key={`tuitui-select--${String(item.label)}-option-${index}`} className='font-normal text-sm text-black'>, {item.label}</span>
        )
      })}
    </div>
  )
}

const CustomMultiSelect = React.forwardRef(function CustomMultiSelect (
  props: MultiSelectUnstyledProps<Item>,
  ref: React.ForwardedRef<any>
) {
  const slots: MultiSelectUnstyledProps<Item>['slots'] = {
    root: StyledButton,
    listbox: StyledMultiListbox,
    popper: StyledPopper,
    ...props.slots
  }

  return <MultiSelectUnstyled {...props} ref={ref} slots={slots} />
})

interface SelectMultipleProps {
  error?: FieldError
  onChange: any
  placeholder: string
  name: string
  disabled?: boolean
  items: Item[]
}

export function SelectInput ({ items, name, placeholder, error, onChange, disabled }: SelectMultipleProps) {
  return (
    <CustomMultiSelect
      className={classnames('disabled:cursor-not-allowed w-80 flex justify-between rounded-sm bg-white border border-solid border-dark-gray focus-within:border-purple focus-within:outline-purple focus-within:outline focus-within:outline-4', {
        'border-red-600': error
      })}
      disabled={disabled}
      placeholder={placeholder}
      renderValue={(option) => renderMultiValue({ name, onChange, option, placeholder })}
    >
      {items.map((item, index) => {
        return <StyledOption
            className='cursor-pointer hover:bg-slate-300 pt-3 px-3 pb-[9px]'
            key={`tuitui-select--${name}-option-${index}`}
            value={item.value}
          >
            {item.label}
          </StyledOption>
      })}
    </CustomMultiSelect>
  )
}
interface RenderMultiValueProps {
  option: Array<SelectOption<Item>> | null
  placeholder: string
  name: string
  onChange: any
}

function renderInputSelectValue ({ name, onChange, option, placeholder }: RenderMultiValueProps) {
  useEffect(() => {
    const values = option?.map(item => item.value)
    onChange({
      target: {
        name,
        type: 'input',
        value: JSON.stringify(values)
      }
    })
  }, [option])

  if (!option?.length) {
    return <span className='font-normal text-sm text-slate-400'>{placeholder}</span>
  }

  return (
    <div className='overflow-hidden inline-block whitespace-nowrap'>
      {option.map((item, index) => {
        if (index === 0) {
          return <span key={`tuitui-select--${String(item.label)}-option-${index}`} className='font-normal text-sm text-black'>{item.label}</span>
        }
        return (
          <span key={`tuitui-select--${String(item.label)}-option-${index}`} className='font-normal text-sm text-black'>, {item.label}</span>
        )
      })}
    </div>
  )
}

const CustomInputSelect = React.forwardRef(function CustomMultiSelect (
  props: MultiSelectUnstyledProps<Item>,
  ref: React.ForwardedRef<any>
) {
  const slots: MultiSelectUnstyledProps<Item>['slots'] = {
    root: StyledButton,
    listbox: StyledMultiListbox,
    popper: StyledPopper,
    ...props.slots
  }

  return <MultiSelectUnstyled {...props} ref={ref} slots={slots} />
})

interface SelectMultipleProps {
  error?: FieldError
  onChange: any
  placeholder: string
  name: string
  disabled?: boolean
  items: Item[]
}

export default function SelectMultiple ({ items, name, placeholder, error, onChange, disabled }: SelectMultipleProps) {
  return (
    <CustomInputSelect
      className={classnames('disabled:cursor-not-allowed w-80 flex justify-between rounded-sm bg-white border border-solid border-dark-gray focus-within:border-purple focus-within:outline-purple focus-within:outline focus-within:outline-4', {
        'border-red-600': error
      })}
      disabled={disabled}
      placeholder={placeholder}
      renderValue={(option) => renderInputSelectValue({ name, onChange, option, placeholder })}
    >
      {items.map((item, index) => {
        return <StyledOption
            className='cursor-pointer hover:bg-slate-300 pt-3 px-3 pb-[9px]'
            key={`tuitui-select--${name}-option-${index}`}
            value={item.value}
          >
            {item.label}
          </StyledOption>
      })}
    </CustomInputSelect>
  )
}
