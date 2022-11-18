import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Tuitui } from '@assets/branding/tuitui.svg'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import Input from '@components/Input'

export function SignUp () {
  const methods = useForm()
  const navigate = useNavigate()

  function submit (data: any) {
    const { formState: { isValid }, setError } = methods

    if (isValid) {
      if (data.password !== data['check-password']) {
        setError('password', {
          type: 'validate',
          message: 'As senhas devem ser iguais'
        })
        setError('check-password', {
          type: 'validate',
          message: 'As senhas devem ser iguais'
        })
        return
      }

      navigate('/app/homepage')
    }
  }

  return (
        <div className='w-full h-screen flex md:flex-row flex-col'>
            <div className='md:w-1/2 w-full h-screen flex gap-8 justify-center items-center md:flex-col bg-white py-12 px-3'>
                <div className='flex flex-col gap-1 px-12'>
                    <h1 className='font-medium text-5xl text-black'>
                        Criar nova conta
                    </h1>
                    <h2 className='font-medium text-3xl text-light-black'>
                        Só mais alguns passos e já vamos poder ficar mais conectados!
                    </h2>
                </div>
                <div className='w-full max-w-[340px] flex items-center'>
                    <Form
                        onSubmit={submit}
                        methods={methods}
                    >
                        <Form.Group>
                            <Input
                                name="fullname"
                                label='Nome completo'
                                placeholder='Digite seu nome completo'
                                isRequired='Campo obrigatório'
                            />
                            <Input
                                name="username"
                                label='Nome de usuário'
                                placeholder='Digite seu nome de usuário'
                                isRequired='Campo obrigatório'
                                icon
                                helper={['O nome de usuário é como será conhecido no Tuitui.', 'Este não poderá ser alterado e será utilizado para ingressar no Tuitui, então escolha bem!']}
                            />
                            <Input
                                name="password"
                                type="password"
                                label='Senha'
                                placeholder='Digite seu senha'
                                isRequired='Campo obrigatório'
                            />
                            <Input
                                name="check-password"
                                type="password"
                                label='Senha'
                                placeholder='Confirme sua nova senha'
                                isRequired='Campo obrigatório'
                            />
                        </Form.Group>
                        <div className='w-full flex flex-col gap-2 pt-8'>
                            <Button
                                title='Criar conta'
                                type='submit'
                            />
                        </div>
                    </Form>
                </div>
            </div>
            <div className='md:w-1/2 w-full flex flex-row md:flex-col justify-center items-center bg-purple p-14'>
                <div className='max-w-[608px] w-full h-full'>
                    <Tuitui width="100%" height="100%" />
                </div>
            </div>
        </div>
  )
}
