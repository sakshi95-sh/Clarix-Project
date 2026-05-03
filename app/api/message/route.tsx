import { generateResponse } from "../../lib/ai";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/auth";
import { saveMessage } from "@/app/lib/messages";
import { getOrCreateChat } from "@/app/lib/chatIdCreation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {message,chatId} = body;
    const user = await verifyAuth();
    if (!message) {
      return NextResponse.json({ response: "Failed to generate response" });
    }
const currentChatId = await getOrCreateChat(
  chatId,
  user.userId
);
await saveMessage({
  chatId: currentChatId,
  content: message,
  role: "user",
});
    const reply = await generateResponse(message);

  await saveMessage({
  chatId: currentChatId,
  content: reply,
  role: "AI",
});

    return NextResponse.json({ response: reply });

  } catch (error) {
    console.error("Chat error:", error);
    return Response.json(
      { error: "Failed to process chat" },
      { status: 500 }
    );
  }
}