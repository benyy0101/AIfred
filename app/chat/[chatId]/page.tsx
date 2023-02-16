import React from 'react';
import Chat from '../../../components/Chat';
import ChatInput from '../../../components/ChatInput';

type Props = {
  params:{
    chatId: string
  }
};

function ChatPage({params}: Props) {

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      {/* Chat */}
      <Chat chatId={params.chatId}/>

      {/* chat input */}
      <ChatInput chatId={params.chatId}/>
    </div>
  )
};

export default ChatPage;