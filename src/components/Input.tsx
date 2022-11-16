import React, { InputHTMLAttributes } from 'react'
import { ReactComponent as Helper } from '../assets/icons/Exclamation-Circle.svg'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean
  label: string
  icon?: boolean
  error?: boolean
  caption?: string
}

export default function Input ({ caption, error = false, icon = false, label, loading = false }: InputProps) {
  return (
        <div className="w-full flex gap-2 p-2 flex-col items-start">
            <label>
                <div className="flex flex-row gap-[6px] p-0 items-center cursor-pointer">
                    <p className='font-medium text-sm text-black flex-none -order-none flex-grow-0'>{label}</p>
                    {icon && (
                        <div className='w-4 h-4'>
                            <Helper width="100%" height="100%" />
                        </div>
                    )}
                </div>
                <div className='w-full flex flex-row items-center px-2 py-[14px] gap-[10px] bg-white border border-solid border-dark-gray rounded-sm'>
                    <input className='w-full font-medium text-sm order-1 flex items-center'
                        placeholder='Placeholder'
                        type="text"
                        disabled={loading}
                    />
                </div>
                {caption && (
                    <div className='flex-none order- self-stretch flex-grow-0'>
                        <p className='font-normal text-sm flex items-center text-dark-gray'>
                            {caption}
                        </p>
                    </div>
                )}
            </label>
        </div>
  )
}
