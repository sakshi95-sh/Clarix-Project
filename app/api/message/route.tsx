import { generateResponse } from "../../lib/ai";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {message,chatId,userId} = body;
    if (!message) {
      return NextResponse.json({ response: "Failed to generate response" });
    }
       let currentChatId = chatId;
    if(!currentChatId){
      const chat = await prisma.chat.create({
        data: {
            user: {
                connect: {
                    id:userId,
                },
            },
  
        }
      });
      currentChatId = chat.id;
    }

     await prisma.message.create({
      data: {
        chat: {
            connect: {
                id: currentChatId,
            },
        },
        content: message,
        role: "user",
      },

    });
    const reply = await generateResponse(message);

    await prisma.message.create({
      data: {
            chat: {
            connect: {
                id: currentChatId,
            },
        },
        content: reply,
        role: "AI",
      },
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