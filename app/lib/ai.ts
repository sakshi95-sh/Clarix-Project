export async function generateResponse(
  prompt: string,
): Promise<ReadableStream<Uint8Array>> {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        stream: true,
        messages: [
          {
            role: "system",
            content: "You are a concise AI assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    },
  );

  if (!response.body) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return response.body.pipeThrough(
    new TransformStream({
      transform(chunk, controller) {
        const text = decoder.decode(chunk);
        const lines = text.split("\n");

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed.startsWith("data:")) continue;

          const json = trimmed.replace("data:", "").trim();

          if (json === "[DONE]") continue;

          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;

            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          } catch {
            // ignore broken partial JSON chunks
          }
        }
      },
    }),
  );
}
