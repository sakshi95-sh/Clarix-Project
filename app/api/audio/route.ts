import { audioToSpeech } from '../../lib/audioToSpeech';
import { generateResponse } from '../../lib/ai';
import { verifyAuth } from '@/app/lib/auth';
import { getOrCreateChat } from "@/app/lib/chatIdCreation";
import { saveMessage } from "@/app/lib/messages";
import { s3 } from "@/app/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request: Request) {
  try {
     let user = null;
    try {
      user = await verifyAuth();
    } catch {
      user = null;
    }
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const chatId = formData.get("chatId") as string;
    if (!formData.has('file')) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);
     const command = new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: `${Date.now()}-${file.name}`,
          Body: buffer,
          ContentType: file.type,
        });
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${command.input.Key}`;
      await s3.send(command);
    const message = formData.get("message") as string;
    const speech = await audioToSpeech(file);
        const response = await generateResponse(speech+ "\n\n" + message);

      if (user) {
    const currentChatId = await getOrCreateChat(
      chatId,
      user?.userId || ""
    );

    await saveMessage({
      chatId: currentChatId,
      content: message || " ",
      role: "user",
      fileUrl: fileUrl,
      fileType: file.type,
    });
    await saveMessage({
      chatId: currentChatId,
      content: response,
      role: "AI",
    });
  }
    return Response.json({ response, 
      fileUrl: fileUrl,
      fileType: file.type
    });
  } catch (error) {
    console.error('Error processing audio:', error);
    return Response.json({ error: 'Failed to process audio' }, { status: 500 });
  }
}