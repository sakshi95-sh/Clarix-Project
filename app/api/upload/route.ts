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
    const text = formData.get('message') as string;
    const chatId = formData.get('chatId') as string;
    console.log("File:", file);
    console.log("Text:", text);
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
    console.log("PDF extraction result:", result);
    const command = new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: `${Date.now()}-${file.name}`,
          Body: safeBuffer,
          ContentType: file.type,
        });
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${command.input.Key}`;
    await s3.send(command);
    let currentChatId = "";
  if(user){
     currentChatId = await getOrCreateChat(
      chatId,
      user?.userId || ""
    );
    await saveMessage({
      chatId: currentChatId,  
      content: text as string,
      role: "user",
      fileUrl: fileUrl,
      fileType: file.type,
    });
  }
    const extractedText = result.text;
    // const finalPromt = `User Question: ${text}\n\nPDF content: ${extractedText}`;
    console.log("Extracted text:", extractedText);

    const finalPromt = text + "\n\n" + extractedText;
    console.log("Final prompt:", finalPromt);
    const response = await generateResponse(finalPromt);
    console.log("Response:", response);
    if(user){
 await saveMessage({
      chatId: currentChatId,
      content: response,
      role: "AI",
    });
  }
    return Response.json({ response: response , fileUrl, fileType: file.type });

  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
}

