import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  icon?: ReactNode
}

export function Button ({ title, icon, type = 'button', disabled, onClick, className, ...rest }: ButtonProps) {
  return (
        <button
          {...rest}
          onClick={onClick}
          disabled={disabled}
          type={type}
          className={String('tuitui-button ').concat(String(className ?? ''))}
        >
            {icon && (
                <div className='tuitui-button--icon'>{icon}</div>
            )}
            {title}
        </button>
  )
}

Button.Secondary = ({ title, icon, type = 'button', disabled, onClick, className, ...rest }: ButtonProps) => {
  return (
          <button
            {...rest}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={String('tuitui-button secondary ').concat(String(className ?? ''))}
          >
              {icon && (
                <div className='tuitui-button--icon'>{icon}</div>
              )}
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
            className={String('tuitui-button tertiary ').concat(String(className ?? ''))}
          >
              {icon && (
                <div className='tuitui-button--icon'>{icon}</div>
              )}
              {title && title}
          </button>
  )
}
