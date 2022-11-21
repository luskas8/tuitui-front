import { Navigation } from '@components/Navigation'
import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout ({ children }: LayoutProps) {
  return (
    <div className='w-full h-screen bg-slate-300 flex flex-col'>
          <Navigation />
          <div data-name='homepage-content' className='w-full h-full px-[250px] pt-7 overflow-hidden overflow-y-auto'>
            {children}
          </div>
        </div>
  )
}
