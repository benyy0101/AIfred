import { DocumentData } from "firebase/firestore";

import React from "react";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isGPT = message.user.name === "ChatGPT";

  if (isGPT) {
    return (
      <div className={`py-6 text-white`}>
        <div className={`flex space-x-4 px-10 max-w-2xl mx-auto justify-end`}>
          <p className={`rounded-lg ml-10 px-8 pt-5 pb-5 text-md bg-[#2294fb] shadow-2xl`}>{message.text}</p>
          <img src={message.user.avatar} alt="" className="h-8 w-8 rounded-full shadow-2xl"></img>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`py-5 text-white `}>
        <div className="flex space-x-4 px-10 max-w-2xl mx-auto ">
          <img src={message.user.avatar} alt="" className="h-8 w-8 rounded-full shadow-2xl"></img>
          <p className=" text-black rounded-lg px-8 pt-5 pb-5 text-md bg-[#d4d4d4] shadow-2xl">{message.text}</p>
        </div>
      </div>
    );
  }
}

export default Message;
