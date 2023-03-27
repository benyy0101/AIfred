
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
    <div className='bg-black h-screen flex flex-col items-center justify-center space-y-10'>
      <div onClick={loginHandler} className="
      flex 
      flex-row 
      space-x-5 
      hover:cursor-pointer 
      animate-pulse 
      duration-1000 
      border
      border-[#2294fb]
      rounded-lg
      border-opacity-50
      p-5
      pt-4
      ">
      <Image
      priority
      src = {openAI}
      width={30}
      height={30}
      alt = 'logo'
      />

      <button  className='font-bold text-5xl  text-[#2294fb]'>AIfred</button>
      </div>
      
    </div>
  )
};

export default Login;