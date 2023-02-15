'use client'

import React from 'react'
import NewChat from './NewChat';
import { useSession,signOut } from 'next-auth/react';
import Image from 'next/image';

function SideBar() {

  const {data: session} = useSession();

  const signoutHandler = () =>{
    signOut('google')
  }
  
  return (
    <div className='p-2 flex flex-col h-screen'>
        <div className='flex-1'>
            {/* Create New Chat */}
            <NewChat></NewChat>
            <div>
                {/* ModelSelection */}

            </div>
            {/* Map through three CharTows */}
        </div>
        {session && <img 
        src={session.user?.image}
        alt='user image'
          className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50'
          onClick={signoutHandler}></img>}
    </div>
  );
}

export default SideBar