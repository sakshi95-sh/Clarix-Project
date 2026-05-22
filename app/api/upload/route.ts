export const dynamic = "force-dynamic";

import { extractTextFromPDF } from "../../lib/pdfService";

import { generateResponse } from "../../lib/ai";

import { getOrCreateChat } from "@/app/lib/chatIdCreation";

import { saveMessage } from "@/app/lib/messages";

import { uploadFile } from "@/app/lib/s3";

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");

    const formData = await request.formData();

    const file = formData.get("file") as File;

    const chatId = formData.get("chatId") as string;

    const message = formData.get("message") as string;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // PDF BUFFER
    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);
    const uint8Array = new Uint8Array(buffer);

    // S3 UPLOAD
    const { url: fileUrl } = await uploadFile(file);

    // PDF TEXT EXTRACTION

    const { text } = await extractTextFromPDF(uint8Array);

    let currentChatId = "";

    // SAVE USER MESSAGE
    if (userId) {
      currentChatId = await getOrCreateChat(chatId, userId);

      await saveMessage({
        chatId: currentChatId,
        content: message || "Shared a PDF",
        role: "user",
        fileUrl: fileUrl,
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
    console.error("Error processing PDF:", error);

    return Response.json(
      {
        error: "Failed to process PDF",
      },
      {
        status: 500,
      },
    );
  }
}
