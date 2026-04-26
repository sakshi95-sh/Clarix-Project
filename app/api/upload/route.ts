import { extractTextFromPDF } from "../../lib/pdfService";
import { generateResponse } from "../../lib/ai";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const text = formData.get('message') as string;

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
    const uint8Array = new Uint8Array(arrayBuffer);

    const result = await extractTextFromPDF(uint8Array);

    console.log("PDF extraction result:", result);

    const extractedText = result.text;
    const finalPromt = `User Question: ${text}\n\nPDF content: ${extractedText}`;

    const reply = await generateResponse(finalPromt);
    return Response.json({ response: reply });

  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
}

