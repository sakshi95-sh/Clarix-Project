import { extractTextFromImage } from "../../lib/ocrService";
import { generateResponse } from "../../lib/ai";
import { s3 } from "@/app/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getOrCreateChat } from "@/app/lib/chatIdCreation";
import { verifyAuth } from "@/app/lib/auth";
import { saveMessage } from "@/app/lib/messages";

export async function POST(request: Request) {

  try {

    let user = null;

    try {
      user = await verifyAuth();
    } catch {
      user = null;
    }

    const body = await request.formData();

    const file = body.get("file") as File;

    const chatId = body.get("chatId") as string;

    const message = body.get("message") as string;

    if (!file) {
      return Response.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `${Date.now()}-${file.name}`,
      Body: buffer,
      ContentType: file.type,
    });

    await s3.send(command);

    const fileUrl =
      `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${command.input.Key}`;

    const text = await extractTextFromImage(buffer);

    const response = await generateResponse(
      text + "\n\n" + message
    );
        if (user) {

    const currentChatId = await getOrCreateChat(
      chatId,
      user?.userId || ""
    );


      await saveMessage({
        chatId: currentChatId,
        content: message || " ",
        role: "user",
        fileUrl,
        fileType: file.type,
      });

      await saveMessage({
        chatId: currentChatId,
        content: response,
        role: "AI",
      });

    }

    return Response.json({
      response,
      fileUrl,
      fileType: file.type,
    });

  } catch (error) {

    console.error("Image error:", error);

    return Response.json(
      { error: "Failed to process image" },
      { status: 500 }
    );

  }
}