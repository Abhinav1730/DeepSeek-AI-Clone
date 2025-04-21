import Chat from "@/app/models/chat.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";

//Creating API to update the chat name
export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not Authenticated",
      });
    }
    const { chatId, name } = await req.json();

    //Connect to the db and update the chat name
    await connectDB()
    await Chat.findOneAndUpdate({ _id: chatId, userId }, { name });
    return NextResponse.json({ success: true, message: "Chat Renamed" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
