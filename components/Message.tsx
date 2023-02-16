import { DocumentData } from "firebase/firestore";

import React from "react";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {


  return <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
    <img src={message.user.avatar} alt="" className="h-8 w-8"></img>
    <p className="pt-1 text-sm">{message.text}</p>
  </div>;
}

export default Message;
