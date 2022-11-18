import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  icon?: ReactNode
}

export function Button ({ title, icon, type = 'button', disabled, onClick }: ButtonProps) {
  return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className='w-full flex justify-center items-center gap-[10px] px-4 py-3 text-sm bg-dark-blue text-white rounded hover:bg-purple active:bg-dark-black active:outline-none focus:outline focus:outline-4 focus:outline-purple disabled:bg-slate-400'
        >
            {icon && icon}
            {title}
        </button>
  )
}

Button.Secondary = ({ title, icon, type = 'button', disabled, onClick }: ButtonProps) => {
  return (
          <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className='w-full flex justify-center items-center gap-[10px] px-4 py-3 text-sm bg-white border border-solid border-dark-blue text-dark-blue rounded hover:border-purple hover:text-purple active:border-dark-black active:text-dark-black active:outline-none focus:outline focus:outline-4 focus:outline-purple disabled:border-slate-400 disabled:text-slate-400'
          >
              {icon && icon}
              {title}
          </button>
  )
}

Button.Tertiary = ({ title, icon, type = 'button', disabled, onClick, className, ...rest }: ButtonProps) => {
  return (
          <button
            {...rest}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={String('w-full flex justify-center items-center gap-[10px] px-4 py-3 text-sm bg-white text-dark-blue rounded hover:text-purple active:border-dark-black active:text-dark-black active:outline-none focus:outline focus:outline-4 focus:outline-purple disabled:border-slate-400 disabled:text-slate-400 ').concat(String(className))}
          >
              {icon && icon}
              {title}
          </button>
  )
}
