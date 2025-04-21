import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import connectDB from '@/app/config/db';
import Chat from '@/app/models/chat.model';

export async function GET(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User not authenticated' });
    }

    await connectDB();
    const data = await Chat.find({userId})
    return NextResponse.json({success:true,data})

  } catch (error) {
    console.error('Update Chat Error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

