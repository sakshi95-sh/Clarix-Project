import { generateResponse } from "../../lib/ai";
import { NextRequest } from "next/server";
import { saveMessage } from "../../lib/messages";
import { getOrCreateChat } from "../../lib/chatIdCreation";
import { prisma } from "@/app/lib/prisma";
import { verify } from "crypto";
import { verifyAuth } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { message, chatId } = body;

    const userID = await verifyAuth();



    // VALIDATION FIRST
    if (typeof message!=='string'|| !message.trim()) {
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
    if (userID) {
      currentChatId = await getOrCreateChat(chatId, userID);
      await saveMessage({
        chatId: currentChatId,
        content: message,
        role: "user",
      });
    }

      if (!userID) {
      return Response.json(
        {
          error: "Unauthorized User",
        },
        {
          status: 401,
        },
      );
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
