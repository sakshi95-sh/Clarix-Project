export const dynamic = "force-dynamic";
import { generateResponse } from "../../lib/ai";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/auth";
import { saveMessage } from "@/app/lib/messages";
import { getOrCreateChat } from "@/app/lib/chatIdCreation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, chatId } = body;
    let user = null;
    try {
      user = await verifyAuth();
    } catch {
      user = null;
    }
    const aiResponse = await generateResponse(message);
    let currentChatId = "";
    if(user)
    {
      if (!message) {
      return NextResponse.json({ response: "Failed to generate response" });
    }
     currentChatId = await getOrCreateChat(
      chatId,
      user?.userId || ""
    );
    await saveMessage({
      chatId: currentChatId,
      content: message,
      role: "user",
    });
    await saveMessage({
      chatId: currentChatId,
      content: aiResponse,
      role: "AI",
    });
    }
return NextResponse.json({ response: aiResponse, chatId: currentChatId });    

  } catch (error) {
    console.error("Chat error:", error);
    return Response.json(
      { error: "Failed to process chat" },
      { status: 500 }
    );
  }
}