import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Chat from "@/app/models/chat.model";
import connectDB from "@/app/config/db";

//Creating API to delete a chat
export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { chatId } = await req.json();
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not Authenticated",
      });
    }

    //Connecting to the db and delete the chat
    await connectDB();
    await Chat.deleteOne({ _id: chatId, userId });
    return NextResponse.json({ success: true, message: "Chat Deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
