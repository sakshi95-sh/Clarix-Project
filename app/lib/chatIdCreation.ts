import { prisma } from "@/app/lib/prisma";

export async function getOrCreateChat(
  chatId: string | undefined,
  userId: string,
) {
  if (chatId) {
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
