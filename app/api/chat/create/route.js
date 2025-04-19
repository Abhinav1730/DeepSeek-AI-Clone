import connectDB from "@/app/config/db";
import Chat from "@/app/models/chat.model";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not Authenticated",
      });
    }

    //Preparing the chat data to be saved in the database
    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
    };

    //Connecting to the database and creating new chat
    await connectDB();
    await Chat.create(chatData);
    return NextResponse.json({ success: true, message: "Chat Created" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
