import { extractTextFromImage } from "../../lib/ocrService";
import { generateResponse } from "../../lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const file = body.get('file') as File;
    const buffer = Buffer.from(await file.arrayBuffer());
   const text = await extractTextFromImage(buffer);

    const message = body.get('message');
   
    console.log('Image text:', text);
    const response = await generateResponse(text + "\n\n" + message);
    
    return Response.json({ response });
  } catch (error) {
    console.error("Image error:", error);
    return Response.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}