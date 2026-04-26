import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest) {


  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: "userId is required" },
      { status: 400 }

    );

  }

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userId:userId
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc"
          },
          take: 1
        }
      }
    });
console.log("CHATS ----------- ",chats);
const formattedChats = chats.map(chat => ({
  id: chat.id,
  preview: chat.messages[0]?.content || "New Chat",
}));

console.log("CHATS ----------- ",formattedChats);
    return NextResponse.json(
      {
        chatHistory: formattedChats
      
      },
      { status: 200 }
    );

  } catch (error) {
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }


}
