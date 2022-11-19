import { ReactComponent as FileText } from '@assets/icons/FileText.svg'
import { Article } from '@components/Article'
import { Button } from '@components/Button'
import { Navigation } from '@components/Navigation'
import { useNavigation } from '@hooks/useNavigation'
import React, { useEffect } from 'react'

export function Homepage () {
  const { setActions } = useNavigation()

  useEffect(() => {
    setActions([
      <Button
        key="new-article-button"
        className='small w-36'
        title='Novo artigo'
        icon={<FileText className='w-full h-full' />}
      />
    ])
  }, [])

  return (
        <div className='w-full h-screen bg-slate-300 flex flex-col'>
          <Navigation />
          <div data-name='homepage-content' className='w-full h-full px-[250px] pt-7 overflow-hidden overflow-y-auto'>
            <Article.Container
              articles={[
                {
                  author: 'luskas8',
                  content: 'Nunc dignissim convallis ipsum sed rhoncus. Proin convallis hendrerit euismod. Nam orci leo, lobortis in velit vitae, faucibus ultricies augue. Cras sollicitudin magna in ligula elementum imperdiet. Sed et nunc non lorem laoreet gravida. Ut tempus mollis ante, vitae sollicitudin turpis. Vivamus molestie, arcu id pretium vestibulum, justo turpis dignissim est, quis aliquam elit sem at nisi. Sed sed dui aliquam tortor suscipit blandit. Pellentesque vel molestie arcu. Ut in dolor tristique, luctus urna eu, sodales turpis. Cras ut diam pretium mi ultrices pretium. Phasellus imperdiet lacus ut mauris hendrerit lacinia. Aliquam sed semper augue. Mauris a est aliquet, placerat ipsum non, volutpat quam. Vestibulum ac est in urna vulputate varius porta eu risus. Aliquam id porta nibh.',
                  title: 'título do artigo',
                  tags: ['']
                }
              ]}
            />
          </div>
        </div>
  )
}
