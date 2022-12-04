import React from 'react'
import { ReactComponent as Loading } from '@assets/icons/Loading.svg'
import classnames from 'classnames'

interface LoadSpinnerProps {
  fullPage?: boolean
}

export function LoadSpinner ({ fullPage }: LoadSpinnerProps) {
  return (
    <div className={classnames('w-full flex flex-col gap-3 justify-center items-center', { 'h-screen': !fullPage, 'h-full': fullPage })}>
      <Loading className='animate-spin h-20 w-20 mr-3' />
      <h1 className='text-lg font-medium'>buscando seus dados, aguarde por favor</h1>
    </div>
  )
}
