import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('chatId');

    if (!chatId) {
        return Response.json(
            { error: "chatId is required" },
            { status: 400 }
        );
    }

    try{
        const messages = await prisma.message.findMany({
            where: {
                chatId: chatId
            }
        });
        return Response.json({ messages });
    }catch(error){
        return Response.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }

    
}