import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyAuth } from "@/app/lib/auth";
import { Console } from "console";

export async function GET(request: NextRequest) {
  try {
    console.log("2  ---------  Chats page");
     console.log("---------");
    const user = await verifyAuth();
    const chats = await prisma.chat.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          take: 1,
        },
      },
    });

    const formattedChats = chats.map((chat) => ({
      id: chat.id,
      preview: chat.messages[0]?.content || "New Chat",
    }));

    // console.log("CHATS ----------- ",formattedChats);
    return NextResponse.json(
      {
        chatHistory: formattedChats,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
