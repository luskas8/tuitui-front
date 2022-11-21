import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as Branding } from '@assets/branding/branding.svg'
import { ReactComponent as Tuitui } from '@assets/branding/tuitui.svg'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import Input from '@components/Input'

export function SignIn () {
  const methods = useForm()
  const navigate = useNavigate()

  function submit (data: any) {
    const { formState: { isValid } } = methods

    if (isValid) {
      navigate('/app/homepage')
    }
  }

  function handleSignUpClick () {
    navigate('/signup')
  }

  return (
        <div className='w-full h-screen flex md:flex-row flex-col'>
            <div className='md:w-1/2 w-full h-screen flex gap-8 justify-center items-center md:flex-col bg-white'>
                <Branding />
                <h1 className='font-medium text-6xl text-light-black decoration-inherit'>
                    conectando ideias
                </h1>
                <div className='w-full max-w-[340px] flex items-center'>
                    <Form
                        onSubmit={submit}
                        methods={methods}
                    >
                        <Form.Group>
                            <Input
                                control={methods.control}
                                name="username"
                                label='Nome de usuário'
                                placeholder='Digite seu nome de usuário'
                                isRequired='Campo obrigatório'
                            />
                            <Input
                                control={methods.control}
                                name="password"
                                type="password"
                                label='Senha'
                                placeholder='Digite seu senha'
                                isRequired='Campo obrigatório'
                            />
                        </Form.Group>
                        <Link className='text-sm text-dark-purple font-normal text-center hover:text-purple'
                            to="/"
                        >
                            Esqueci minha senha
                        </Link>
                        <div className='w-full flex flex-col gap-2 pt-8'>
                            <Button
                                title='Entrar'
                                type='submit'
                            />
                            <Button.Secondary
                                title='Criar nova conta'
                                onClick={handleSignUpClick}
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
