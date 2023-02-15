
'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import openAI from '../public/openai-svgrepo-com.svg'

function Login() {
  const loginHandler = () =>{
    signIn("google")
  };

  return (
    <div className='bg-[#11A37F] h-screen flex flex-col items-center justify-center space-y-10'>
      <Image
      priority
      src = {openAI}
      width={300}
      height={300}
      alt = 'logo'
      />

      <button onClick={loginHandler} className='text-white font-bold text-3xl animate-pulse'> Sign In to use AIfred</button>
    </div>
  )
};

export default Login;