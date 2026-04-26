
import { extractText, getDocumentProxy } from 'unpdf'


export async function extractTextFromPDF(data: Uint8Array) {
  try {
    const pdf = await getDocumentProxy(data);
    const { text, totalPages } = await extractText(pdf, { mergePages: true });
    return { text, totalPages };
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to process PDF');
  }
}