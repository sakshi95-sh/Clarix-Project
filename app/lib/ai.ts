export async function generateResponse(prompt: string) {

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        stream: true,
        messages: [
          {
            role: "system",
            content:
              "You are a concise AI assistant. Keep responses short, direct, and to the point. Only provide detailed explanations if the user explicitly asks for them.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate AI response");
  }
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Response body is not readable");
  }
  const decoder = new TextDecoder();
  let content = "";
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine.startsWith("data:")) continue;
        const jsonString = trimmedLine.replace("data:", "").trim();
        if (jsonString === "[DONE]") {
          break;
        }
        try {
          const parsed = JSON.parse(jsonString);
          content += parsed.choices?.[0]?.delta?.content || "";
        } catch (error) {
          console.error("JSON parse error:", error);
        }
      }
    }
    return content;
  } finally {
    reader.cancel();
  }
}