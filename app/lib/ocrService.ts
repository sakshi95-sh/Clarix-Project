import tesseract from 'node-tesseract-ocr';

export async function extractTextFromImage(imageBuffer: Buffer) {
  try {
    const config = {
      lang: 'eng',
      oem: 1,
      psm: 3,
    };
    
    const text = await tesseract.recognize(imageBuffer, config);
    console.log('OCR Text:', text);
    return text;

  } catch (error) {
    console.error('OCR Error:', error);
    throw error;
  }
}