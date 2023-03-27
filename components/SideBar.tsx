'use client'

import React from 'react'
import NewChat from './NewChat';
import { useSession,signOut } from 'next-auth/react';
import {useCollection} from 'react-firebase-hooks/firestore';
import { collection,query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';
import TempForm from './TempForm';

function SideBar() {

  const {data: session} = useSession();

  const [chats, loading, error] = useCollection(
    session && query(
      collection(db, "users", session.user?.email!, "chats"),
      orderBy("createdAt", "asc")
    )
  );

  
  const signoutHandler = () =>{
    signOut({
      callbackUrl: '/'
    });
  };
  
  return (
    <div className='p-2 flex flex-col h-screen'>
        <div className='flex-1 space-y-2'>
            {/* Create New Chat */}
            <NewChat></NewChat>
            {/* ModelSelection */}
                <div className='hidden sm:inline '>
                  <ModelSelection></ModelSelection>
                  <TempForm/>
                </div>
            <div className='flex flex-col space-y-2 my-2'>
              {loading && (
                <div className="animate-pulse text-center text-white">
                    <p> Loading Chats...</p>
                </div>

              )}
                {/* Map through three CharTows */}
            {chats?.docs.map(chat => (
              <ChatRow key = {chat.id} id={chat.id}></ChatRow>
            ))}
            </div>
            
        </div>
        {session && <img 
        src={session.user?.image!}
        alt='user image'
          className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-80 transition duration-100'
          onClick={signoutHandler}></img>}
    </div>
  );
}

export default SideBar