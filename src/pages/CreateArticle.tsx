import { Button } from '@components/Button'
import { Form } from '@components/Form'
import Input from '@components/Input'
import { useNavigation } from '@hooks/useNavigation'
import Layout from '@layout'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function CreateArticle () {
  const navigate = useNavigate()
  const { setActions } = useNavigation()
  const methods = useForm()

  function handleCancelClick () {
    navigate(-1)
  }

  function submit () {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    methods.handleSubmit((data: any) => console.log(data))()
  }

  useEffect(() => {
    setActions([
      <Button.Secondary
        key="cancel-button"
        title='Cancelar'
        onClick={handleCancelClick}
      />,
      <Button
        key="save-button"
        title='Salvar'
        onClick={submit}
      />
    ])
  }, [])
  return (
    <Layout>
      <div className='tuitui-article--preview w-full h-fit rounded-lg bg-white py-[5px] px-2 overflow-hidden'>
        <Form methods={methods} onSubmit={() => {}}>
          <Input
            control={methods.control}
            name='title'
            label='Título do artigo'
            isRequired='Campo obrigatório'
          />
        </Form>
      </div>
    </Layout>
  )
}
