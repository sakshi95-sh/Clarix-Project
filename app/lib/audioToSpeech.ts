import OpenAI from "openai";

const openai = new OpenAI();
export async function audioToSpeech(file: File) {
  try {
    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: file,
    });
    return transcription.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw error;
  }
}