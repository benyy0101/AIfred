'use client';
import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import {useRouter} from 'next/navigation';
import { db } from "../firebase";
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {useSession} from 'next-auth/react';



function NewChat() {

  const router = useRouter();
  const {data: session} = useSession();

  const createNewChat = async () => {
    console.log('why?')
    const userCollectionRef = collection(db, 'users',session?.user?.email!, 'chats');
    const doc = await addDoc(userCollectionRef, {
      messages:[],
      userId: session?.user?.email!,
      createdAt: serverTimestamp()
    });
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p >New Chat</p>
    </div>
  );
}

export default NewChat;
