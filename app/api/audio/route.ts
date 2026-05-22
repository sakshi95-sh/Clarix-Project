export const dynamic = "force-dynamic";

import { generateResponse } from "../../lib/ai";

import { getOrCreateChat } from "@/app/lib/chatIdCreation";

import { saveMessage } from "@/app/lib/messages";

import { uploadFile } from "@/app/lib/s3";

export async function POST(request: Request) {
  const { audioToSpeech } = await import("../../lib/audioToSpeech");

  try {
    const userId = request.headers.get("x-user-id");

    const formData = await request.formData();

    const file = formData.get("file") as File;

    const chatId = formData.get("chatId") as string;

    const message = formData.get("message") as string;

    if (!formData.has("file")) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // AUDIO BUFFER
    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    // S3 UPLOAD
    const { url: fileUrl } = await uploadFile(file);

    // SPEECH TO TEXT
    const speech = await audioToSpeech(file);

    let currentChatId = "";

    // SAVE USER MESSAGE
    if (userId) {
      currentChatId = await getOrCreateChat(chatId, userId);

      await saveMessage({
        chatId: currentChatId,
        content: message || "Shared voice recording",
        role: "user",
        fileUrl: fileUrl,
        fileType: file.type,
      });
    }

    // REAL STREAM
    const stream = await generateResponse(speech + "\n\n" + message);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "x-chat-id": currentChatId,
      },
    });
  } catch (error) {
    console.error("Error processing audio:", error);

    return Response.json({ error: "Failed to process audio" }, { status: 500 });
  }
}
