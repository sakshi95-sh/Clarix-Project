export const dynamic = "force-dynamic";

import { extractTextFromImage } from "../../lib/ocrService";

import { generateResponse } from "../../lib/ai";

import { uploadFile } from "@/app/lib/s3";

import { getOrCreateChat } from "@/app/lib/chatIdCreation";

import { saveMessage } from "@/app/lib/messages";

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");

    const body = await request.formData();

    const file = body.get("file") as File;

    const chatId = body.get("chatId") as string;

    const message = body.get("message") as string;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // IMAGE BUFFER
    const buffer = Buffer.from(await file.arrayBuffer());

    // S3 UPLOAD
    const { url: fileUrl } = await uploadFile(file);

    // OCR
    const text = await extractTextFromImage(buffer);

    let currentChatId = "";

    // SAVE USER MESSAGE
    if (userId) {
      currentChatId = await getOrCreateChat(chatId, userId);

      await saveMessage({
        chatId: currentChatId,
        content: message || "Shared an image",
        role: "user",
        fileUrl,
        fileType: file.type,
      });
    }

    // REAL STREAM
    const stream = await generateResponse(text + "\n\n" + message);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "x-chat-id": currentChatId,
      },
    });
  } catch (error) {
    console.error("Image error:", error);

    return Response.json({ error: "Failed to process image" }, { status: 500 });
  }
}
