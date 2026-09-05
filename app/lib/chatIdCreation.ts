import { prisma } from "@/app/lib/prisma";

export async function getOrCreateChat(
  chatId: string | undefined,
  userId: string,
) {
  if (chatId) {
    const existingChat = await prisma.chat.findFirst(
          {
            where: {
              id: chatId,
              userId,
            }
      })
    
    if(!existingChat) throw new Error("Chat not found or unauthorized");

    return chatId;
  }


  
  const chat = await prisma.chat.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return chat.id;
}
