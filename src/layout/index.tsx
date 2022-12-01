import { Navigation } from '@components/Navigation'
import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  classname?: string
}

export default function Layout ({ children, classname }: LayoutProps) {
  return (
    <div className='w-full h-screen bg-slate-300 flex flex-col'>
          <Navigation />
          <div data-name='homepage-content' className={String('w-full h-full px-[250px] py-7 overflow-hidden overflow-y-auto ').concat(classname ?? '')}>
            {children}
          </div>
        </div>
  )
}
