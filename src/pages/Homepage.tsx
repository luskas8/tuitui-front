import React, { ReactComponent as FileText } from '@assets/icons/FileText.svg'
import { Button } from '@components/Button'
import { Navigation } from '@components/Navigation'
import { useNavigation } from '@hooks/useNavigation'
import { useEffect } from 'react'

export function Homepage () {
  const { setActions } = useNavigation()

  useEffect(() => {
    setActions([
      <Button
        key="new-article-button"
        className='small w-32'
        title='Novo artigo'
        icon={<FileText className='w-full h-full' />}
      />
    ])
  }, [])

  return (
        <div className='w-full h-screen bg-slate-300'>
          <Navigation />
          HOMEPAGE
        </div>
  )
}
