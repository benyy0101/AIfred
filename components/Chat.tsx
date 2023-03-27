"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { query, orderBy, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex-1 overflow-y-scroll">
      {messages?.empty && (
        <Fragment>
          <p className="mt-20 text-center text-white text-3xl select-none">
            What can I do for you today?
          </p>
        </Fragment>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()}/>
      ))}
    </div>
  );
}

export default Chat;
