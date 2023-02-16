import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { adminDB } from "../../firebaseadmin";
import query from "../../lib/queryApi";


type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session, email } = req.body;
  
  if (!prompt) {
    res.status(400).json({ answer: "No prompt provided" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "No chatId provided" });
    return;
  }

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "ChatGPT was unable to find answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxmSZ5_rdrDTIE9Tdp7reg3abrsh--9cvlXzIihM_4v04SdOpanxYU3cRNzbqC_9OBTNY&usqp=CAU",
    },
  };

  await adminDB
    .collection("users")
    .doc(email!)
    .collection("chats")
    .doc(String(chatId))
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
