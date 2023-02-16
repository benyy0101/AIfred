'use client';
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React, { FormEvent } from "react";
import { useSession } from "next-auth/react";
import { addDoc,collection, CollectionReference, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";

type Props = {
    chatId: string;
};

function ChatInput({ chatId }: Props) {
    
    const [prompt, setPrompt] = React.useState<string>("");

    const {data:session} = useSession();

    const model = "text-davinci-003"

    const promptInputHandler =(e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value!)
    }

    const promptSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!prompt) return;

        const input = prompt.trim();
        setPrompt('');
        const message: Message = {
            text: input,
            createdAt: new Date(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatar.com/api/?name=${session?.user?.name}`,
        }};
        

        await addDoc(
            collection(db,'users',session?.user?.email!, 'chats', chatId, 'messages'),
            message
        )

        const notification = toast.loading('AIfred is thinking...');
        
        try{
            const response = await fetch('/api/askQuestion',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt:input,
                    chatId: chatId, 
                    model: model, 
                    email: session?.user?.email!,
                    session: session,
                })
            });
    
            if (response.ok) {
                //Toast notification
                toast.success('AIfred has responded!', {
                    id: notification,
                    });
            }
        }
        catch(error){
            console.log(error)
            toast.error('AIfred has failed to respond!', {
                id: notification,
                });
        }
        

    };

    return <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm ">
        <form className="p-5 space-x-5 flex" onSubmit={promptSubmitHandler}>

            <input 
            value={prompt}
            onChange={promptInputHandler}
            className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!session}
            type="text" 
            placeholder="Type a message here..." />

            <button 
            type="submit" 
            disabled={!prompt || !session}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
                <PaperAirplaneIcon className="h-4 w-4 -rotate-45"></PaperAirplaneIcon>
            </button>
        </form>
    </div>;
}

export default ChatInput;
