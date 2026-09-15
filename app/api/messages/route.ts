import { prisma } from "../../lib/prisma";
import { verifyAuth } from "@/app/lib/auth";

export async function GET(request: Request) {
  const userId = await verifyAuth();

  if (userId) {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");

    if (!chatId) {
      return Response.json({ error: "chatId is required" }, { status: 400 });
    }
    try {
      const messages = await prisma.message.findMany({
        where: {
          chatId: chatId,
        },
      });
      return Response.json({ messages });
    } catch (error) {
      console.log("ERROR INFOMATION-------",error)
      return Response.json(
        { error: "Failed to fetch messages" },
        { status: 500 },
      );
    }
  }
}
