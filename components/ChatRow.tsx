import React from "react";
import Link from "next/link";
import {
  ChatBubbleBottomCenterIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();

  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats", id, "messages"),
        orderBy("createdAt", "desc")
      )
  );
  const deleteChat = () => {
    if (confirm("Are you sure you want to delete this chat?")) {
      router.push("/");
      db.collection("users")
        .doc(session.user?.email!)
        .collection("chats")
        .doc(id)
        .delete();
    }
  };

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  return (
    <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && 'bg-gray-700'}`}>
      <ChatBubbleBottomCenterIcon className="h-5 w-5" />
      {/* Snapshot of the latest chat or New chat */}
      <p className="flex-1 hidden md:inline-flex truncate">{messages?.docs[0]?.data().text || 'New Chat'}</p>
      <TrashIcon className="h-5 w-5 text-gray-700 hover:text-red-700"></TrashIcon>
    </Link>
  );
}

export default ChatRow;
