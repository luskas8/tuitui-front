import React, { useEffect } from 'react'
import { Article as ArticleComponent } from '@components/Article'
import { ReactComponent as FileText } from '@assets/icons/FileText.svg'
import Layout from '@layout'
import { useNavigation } from '@hooks/useNavigation'
import { Button } from '@components/Button'

export function Article () {
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
    <Layout>
      <ArticleComponent
        author='luskas8'
        content='Nunc dignissim convallis ipsum sed rhoncus. Proin convallis hendrerit euismod. Nam orci leo, lobortis in velit vitae, faucibus ultricies augue. Cras sollicitudin magna in ligula elementum imperdiet. Sed et nunc non lorem laoreet gravida. Ut tempus mollis ante, vitae sollicitudin turpis. Vivamus molestie, arcu id pretium vestibulum, justo turpis dignissim est, quis aliquam elit sem at nisi. Sed sed dui aliquam tortor suscipit blandit. Pellentesque vel molestie arcu. Ut in dolor tristique, luctus urna eu, sodales turpis. Cras ut diam pretium mi ultrices pretium. Phasellus imperdiet lacus ut mauris hendrerit lacinia. Aliquam sed semper augue. Mauris a est aliquet, placerat ipsum non, volutpat quam. Vestibulum ac est in urna vulputate varius porta eu risus. Aliquam id porta nibh. Nunc dignissim convallis ipsum sed rhoncus. Proin convallis hendrerit euismod. Nam orci leo, lobortis in velit vitae, faucibus ultricies augue. Cras sollicitudin magna in ligula elementum imperdiet. Sed et nunc non lorem laoreet gravida. Ut tempus mollis ante, vitae sollicitudin turpis. Vivamus molestie, arcu id pretium vestibulum, justo turpis dignissim est, quis aliquam elit sem at nisi. Sed sed dui aliquam tortor suscipit blandit. Pellentesque vel molestie arcu. Ut in dolor tristique, luctus urna eu, sodales turpis. Cras ut diam pretium mi ultrices pretium. Phasellus imperdiet lacus ut mauris hendrerit lacinia. Aliquam sed semper augue. Mauris a est aliquet, placerat ipsum non, volutpat quam. Vestibulum ac est in urna vulputate varius porta eu risus. Aliquam id porta nibh.
        Nulla a ante et eros vulputate porta. Maecenas eu porta enim, in tempus quam. Etiam vel massa bibendum libero fringilla hendrerit et ac eros. Suspendisse mauris lectus, finibus nec rhoncus sit amet, placerat eu dolor. Mauris lacinia mauris purus, euismod consectetur metus porttitor non. Etiam in fermentum ante, eget condimentum arcu. Aliquam vulputate laoreet lacinia. Nunc quis volutpat eros, sit amet pulvinar enim. Donec velit mauris, ullamcorper at diam at, porta varius leo. Morbi sem massa, venenatis at facilisis in, egestas vitae urna. In volutpat mauris id justo fringilla pharetra. Quisque lacus ex, bibendum ut pharetra consectetur, efficitur quis lacus. Vivamus laoreet vitae ligula ac dapibus.

        Suspendisse potenti. Etiam pellentesque, urna sed ornare imperdiet, nunc enim aliquam metus, non eleifend ligula nisl sit amet nisi. Mauris ac nisi eleifend, bibendum nisi in, facilisis eros. Morbi pharetra eros sit amet lobortis consequat. Nulla consectetur, augue et porta ultrices, mi tellus dictum erat, eget tristique nulla magna in enim. Nam auctor lacus sed eros dictum consequat. Proin convallis nisi id leo vehicula, nec ornare risus hendrerit. Nulla sed lacinia nunc, nec feugiat lacus. Donec dictum leo ipsum. Fusce nec ante a nunc efficitur ultricies non vitae orci.Nunc dignissim convallis ipsum sed rhoncus. Proin convallis hendrerit euismod. Nam orci leo, lobortis in velit vitae, faucibus ultricies augue. Cras sollicitudin magna in ligula elementum imperdiet. Sed et nunc non lorem laoreet gravida. Ut tempus mollis ante, vitae sollicitudin turpis. Vivamus molestie, arcu id pretium vestibulum, justo turpis dignissim est, quis aliquam elit sem at nisi. Sed sed dui aliquam tortor suscipit blandit. Pellentesque vel molestie arcu. Ut in dolor tristique, luctus urna eu, sodales turpis. Cras ut diam pretium mi ultrices pretium. Phasellus imperdiet lacus ut mauris hendrerit lacinia. Aliquam sed semper augue. Mauris a est aliquet, placerat ipsum non, volutpat quam. Vestibulum ac est in urna vulputate varius porta eu risus. Aliquam id porta nibh.
        Nulla a ante et eros vulputate porta. Maecenas eu porta enim, in tempus quam. Etiam vel massa bibendum libero fringilla hendrerit et ac eros. Suspendisse mauris lectus, finibus nec rhoncus sit amet, placerat eu dolor. Mauris lacinia mauris purus, euismod consectetur metus porttitor non. Etiam in fermentum ante, eget condimentum arcu. Aliquam vulputate laoreet lacinia. Nunc quis volutpat eros, sit amet pulvinar enim. Donec velit mauris, ullamcorper at diam at, porta varius leo. Morbi sem massa, venenatis at facilisis in, egestas vitae urna. In volutpat mauris id justo fringilla pharetra. Quisque lacus ex, bibendum ut pharetra consectetur, efficitur quis lacus. Vivamus laoreet vitae ligula ac dapibus.

        Suspendisse potenti. Etiam pellentesque, urna sed ornare imperdiet, nunc enim aliquam metus, non eleifend ligula nisl sit amet nisi. Mauris ac nisi eleifend, bibendum nisi in, facilisis eros. Morbi pharetra eros sit amet lobortis consequat. Nulla consectetur, augue et porta ultrices, mi tellus dictum erat, eget tristique nulla magna in enim. Nam auctor lacus sed eros dictum consequat. Proin convallis nisi id leo vehicula, nec ornare risus hendrerit. Nulla sed lacinia nunc, nec feugiat lacus. Donec dictum leo ipsum. Fusce nec ante a nunc efficitur ultricies non vitae orci.'
        tags={['abababdjs', 'basds babs', 'csad sdkaksj', 'basds babs', 'csad', 'basds babs', 'csad sdkaksj']}
        title='título do artigo'
      />
    </Layout>
  )
}
