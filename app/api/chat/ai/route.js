import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/app/config/db";
import Chat from "@/app/models/chat.model";

// Initialize Gemini AI client
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    // Extracting chatId and prompt from the request body
    const { chatId, prompt } = await req.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not Authenticated",
      });
    }

    // Find the chat document in the database
    await connectDB();
    const data = await Chat.findOne({ userId, _id: chatId });

    // Check if the chat data exists
    if (!data) {
      return NextResponse.json({
        success: false,
        message: "Chat not found",
      });
    }

    // Create a user message
    const userPrompt = {
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };

    // Push the user prompt into the messages array
    data.messages.push(userPrompt);

    // Call Gemini AI to get chat completion
    const model = genAI.models; // Access the models from GoogleGenAI client

    // Generate the response using the correct model and content
    const response = await model.generateContent({
      model: "gemini-2.0-flash-001", // Using the model name from your example
      contents: prompt, // Pass the prompt content
    });

    console.log("Gemini AI Response:", response); // Debugging log

    // Ensure the response has text content
    if (!response || !response.text) {
      throw new Error("No valid response from Gemini AI");
    }

    const generatedText = response.text; // Extract the generated text

    // Create the assistant message
    const assistantMessage = {
      role: "assistant",
      content: generatedText,
      timestamp: Date.now(),
    };

    // Push the assistant message into the messages array
    data.messages.push(assistantMessage);
    // Save the updated chat data
    await data.save();
    return NextResponse.json({ success: true, data: assistantMessage });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
