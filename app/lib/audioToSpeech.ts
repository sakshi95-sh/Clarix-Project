import OpenAI from "openai";

const openai = new OpenAI();

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);

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