import React from 'react'
import { ReactComponent as Branding } from '../assets/branding/branding.svg'
import { ReactComponent as Tuitui } from '../assets/branding/tuitui.svg'
import Input from '../components/Input'

export function SignIn () {
  return (
        <div className='w-full h-screen flex md:flex-row flex-col'>
            <div className='md:w-1/2 w-full h-screen flex justify-center items-center md:flex-col bg-white'>
                <Branding />
                <h1 className='font-medium text-6xl text-light-black decoration-inherit'>
                    conectando ideias
                </h1>
                <Input label='label' icon />
            </div>
            <div className='md:w-1/2 w-full flex flex-row md:flex-col justify-center items-center bg-purple p-14'>
                <div className='max-w-[608px] w-full h-full'>
                    <Tuitui width="100%" height="100%" />
                </div>
            </div>
        </div>
  )
}
