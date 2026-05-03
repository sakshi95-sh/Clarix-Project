import { prisma } from "@/app/lib/prisma";

type SaveMessageProps = {
  chatId: string;
  content: string;
  role: "user" | "AI";
  fileUrl?: string;
  fileType?: string;
};

export async function saveMessage({
  chatId,
  content,
  role,
  fileUrl,
  fileType,
}: SaveMessageProps) {
  return prisma.message.create({
    data: {
      chat: {
        connect: {
          id: chatId,
        },
      },
      content,
      role,
      fileUrl,
      fileType,
    },
  });
}