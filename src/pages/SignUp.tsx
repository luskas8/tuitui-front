import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Tuitui } from '@assets/branding/tuitui.svg'
import { Button } from '@components/Button'
import { Form, FormGroup } from '@components/Form'
import Input from '@components/Input'
import { useAuth } from '@hooks/useAuth'

interface FormValues {
  email: string
  username: string
  password: string
}

export function SignUp () {
  const { token, signup } = useAuth()
  const navigate = useNavigate()

  if (token) {
    navigate('/app/homepage')
    return null
  }

  const methods = useForm<FormValues | any>({
    defaultValues: {
      email: '',
      username: '',
      password: ''
    }
  })
  const { formState: { isValid, isValidating, isSubmitting } } = methods

  function submit (e: any) {
    e.preventDefault()
    methods.clearErrors()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    methods.handleSubmit(async (data: FormValues) => {
      if (isValid) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        signup(data.email, data.password, data.username).then(error => {
          if (error) {
            methods.setError('signup', { message: 'Pode ser que algumas informaçoes já foram usadas, tente outras por favor.' })
          } else {
            navigate('/app/homepage')
          }
        })
      }
    })()
  }

  function handleCancel () {
    navigate(-1)
  }

  return (
        <div className='w-full h-screen flex md:flex-row flex-col'>
            <div className='md:w-1/2 w-full h-screen flex gap-8 justify-center items-center flex-col bg-white py-12 px-3'>
                <div className='flex flex-col gap-1 px-12'>
                    <h1 className='font-medium lg:text-5xl md:text-5xl text-4xl text-black'>
                        Criar nova conta
                    </h1>
                    <h2 className='font-medium lg:text-3xl md:text-2xl  text-xl text-light-black'>
                        Só mais alguns passos e já vamos poder ficar mais conectados!
                    </h2>
                </div>
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
                                name="username"
                                label='Nome de usuário'
                                placeholder='Digite seu nome de usuário'
                                isRequired='Campo obrigatório'
                                icon
                                helper={['O nome de usuário é como será conhecido no Tuitui.', 'Este não poderá ser alterado, então escolha bem!']}
                            />
                            <Input
                                control={methods.control}
                                name="password"
                                type="password"
                                label='Senha'
                                placeholder='Digite seu senha'
                                isRequired='Campo obrigatório'
                                rules={{
                                  validate: (value: string) => value === methods.getValues()['check-password'] || 'As senhas devem ser iguais'
                                }}
                            />
                            <Input
                                control={methods.control}
                                name="check-password"
                                type="password"
                                label='Confirmar senha'
                                placeholder='Confirme sua nova senha'
                                isRequired='Campo obrigatório'
                                rules={{
                                  validate: (value: string) => value === methods.getValues().password || 'As senhas devem ser iguais'
                                }}
                            />
                        </FormGroup>
                        <div className='w-full flex flex-col gap-2 pt-8'>
                            <Button
                                title='Criar conta'
                                type='submit'
                                onClick={submit}
                                disabled={!isValid || isValidating || isSubmitting}
                            />
                            <Button.Secondary
                                title='Cancelar'
                                type='button'
                                onClick={handleCancel}
                            />
                        </div>
                    </Form>
                </div>
            </div>
            <div className='md:w-1/2 w-full md:flex hidden flex-row justify-center items-center bg-purple p-14'>
                <div className='max-w-[608px] w-full h-full'>
                    <Tuitui width="100%" height="100%" />
                </div>
            </div>
        </div>
  )
}
