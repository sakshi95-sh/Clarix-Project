export const dynamic = "force-dynamic";
import { extractTextFromPDF } from "../../lib/pdfService";
import { generateResponse } from "../../lib/ai";
import { verifyAuth } from "@/app/lib/auth";
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
    const file = formData.get('file') as File;
   const message = formData.get("message") as string;
    const chatId = formData.get('chatId') as string;
    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
   
    // convert file → buffer
    const arrayBuffer = await file.arrayBuffer();
    const safeBuffer = Buffer.from(arrayBuffer);
    const uint8Array = new Uint8Array(safeBuffer);
    const result = await extractTextFromPDF(uint8Array);

    const command = new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: `${Date.now()}-${file.name}`,
          Body: safeBuffer,
          ContentType: file.type,
        });
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${command.input.Key}`;
    await s3.send(command);
     const extractedText = result.text;
    const finalPromt = message + "\n\n" + extractedText;
    const response = await generateResponse(finalPromt);
  if(user){
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
    return Response.json({ 
      response, 
      fileUrl, 
      fileType: file.type 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
}

