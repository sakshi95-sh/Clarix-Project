import { generateResponse } from "../../lib/ai";
import { NextRequest } from "next/server";
import { saveMessage } from "../../lib/messages";
import { getOrCreateChat } from "../../lib/chatIdCreation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { message, chatId } = body;

    const userId = request.headers.get("x-user-id");

    // VALIDATION FIRST
    if (!message) {
      return Response.json(
        {
          error: "Message is required",
        },
        {
          status: 400,
        },
      );
    }

    let currentChatId = "";

    // SAVE USER MESSAGE
    if (userId) {
      currentChatId = await getOrCreateChat(chatId, userId);

      await saveMessage({
        chatId: currentChatId,
        content: message,
        role: "user",
      });
    }

    // REAL STREAM
    const stream = await generateResponse(message);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "x-chat-id": currentChatId,
      },
    });
  } catch (error) {
    console.error("Chat error:", error);

    return Response.json(
      {
        error: "Failed to process chat",
      },
      {
        status: 500,
      },
    );
  }
}
