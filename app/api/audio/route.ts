import { audioToSpeech } from '../../lib/audioToSpeech';
import { generateResponse } from '../../lib/ai';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    if (!formData.has('file')) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }
    const file = formData.get('file') as File;
    const message = formData.get('message');
    
    const speech = await audioToSpeech(file);
    
    const response = await generateResponse(speech+ "\n\n" + message);

    return Response.json({ response });


  } catch (error) {
    console.error('Error processing audio:', error);
    return Response.json({ error: 'Failed to process audio' }, { status: 500 });
  }
}