'use client'

import React from 'react'
import NewChat from './NewChat';
import { useSession,signOut } from 'next-auth/react';
import {useCollection} from 'react-firebase-hooks/firestore';
import { collection,query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import ChatRow from './ChatRow';

function SideBar() {

  const {data: session} = useSession();

  const [chats, loading, error] = useCollection(
    session && query(
      collection(db, "users", session.user?.email!, "chats"),
      orderBy("createdAt", "asc")
    )
  );

  
  const signoutHandler = () =>{
    signOut('google')
  };
  
  return (
    <div className='p-2 flex flex-col h-screen'>
        <div className='flex-1 space-y-2'>
            {/* Create New Chat */}
            <NewChat></NewChat>
            <div>
                {/* ModelSelection */}

            </div>
            {/* Map through three CharTows */}
            {chats?.docs.map(chat => (
              <ChatRow key = {chat.id} id={chat.id}></ChatRow>
            ))}
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