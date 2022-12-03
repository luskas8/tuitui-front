import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ReactComponent as Branding } from '@assets/branding/branding.svg'
import { ReactComponent as Tuitui } from '@assets/branding/tuitui.svg'
import { Button } from '@components/Button'
import { Form, FormGroup } from '@components/Form'
import Input from '@components/Input'
import { useAuth } from '@hooks/useAuth'

interface FormValues {
  email: string
  password: string
}

export function SignIn () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParems] = useSearchParams()
  const unauthorizedCode = searchParams.get('code') ?? null

  const { token, authenticate } = useAuth()
  const navigate = useNavigate()

  // TODO esperar rota de validação de token e esperar validar o token caso tenha, se não seguir

  if (token) {
    navigate('/app/homepage')
    return null
  }

  const methods = useForm<FormValues | any>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { formState: { isValid, isValidating, isSubmitting }, setError } = methods

  function submit (e: any) {
    e.preventDefault()
    methods.clearErrors()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    methods.handleSubmit((data: FormValues) => {
      if (isValid) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        authenticate(data.email, data.password).then((error) => {
          if (error) {
            methods.setError('signin', { message: 'Usuário ou senha incorretos, tente novamente.' })
          } else {
            navigate('/app/homepage')
          }
        })
      }
    },
    () => {
      methods.clearErrors()
      methods.handleSubmit((data: FormValues) => {
        if (data.email && data.password) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          authenticate(data.email, data.password).then((error) => {
            if (error) {
              methods.setError('validate', { message: error })
            } else {
              navigate('/app/homepage')
            }
          }).catch()
        }
      })
    }
    )()
  }

  function handleSignUpClick () {
    navigate('/signup')
  }

  useEffect(() => {
    if (unauthorizedCode) {
      setError('unauthorized', { message: 'Sua sessão expirou, por favor logue novamente.' })
    }
  }, [])

  return (
        <div className='w-full h-screen flex md:flex-row flex-col'>
            <div className='md:w-1/2 w-full h-screen flex gap-8 justify-center items-center flex-col bg-white'>
                <Branding />
                <h1 className='font-medium lsg:text-6xl md:text-4xl text-3xl text-light-black decoration-inherit'>
                    conectando ideias
                </h1>
                <div className='w-full max-w-[340px] flex items-center'>
                    <Form
                        methods={methods}
                    >
                        <FormGroup>
                            <Input
                                control={methods.control}
                                name="email"
                                label='Email'
                                placeholder='Digite seu email'
                                isRequired='Campo obrigatório'
                            />
                            <Input
                                control={methods.control}
                                name="password"
                                type="password"
                                label='Senha'
                                placeholder='Digite sua senha'
                                isRequired='Campo obrigatório'
                            />
                        </FormGroup>
                        {/* <Link className='text-sm text-dark-purple font-normal text-center hover:text-purple'
                            to="/"
                        >
                            Esqueci minha senha
                        </Link> */}
                        <div className='w-full flex flex-col gap-2 pt-8'>
                            <Button
                                title='Entrar'
                                type='submit'
                                onClick={submit}
                                disabled={!isValid || isValidating || isSubmitting}
                            />
                            <Button.Secondary
                                title='Criar nova conta'
                                onClick={handleSignUpClick}
                            />
                        </div>
                    </Form>
                </div>
            </div>
            <div className='md:w-1/2 w-full md:flex hidden flex-col justify-center items-center bg-purple p-14'>
                <div className='max-w-[608px] w-full h-full'>
                    <Tuitui width="100%" height="100%" />
                </div>
            </div>
        </div>
  )
}
