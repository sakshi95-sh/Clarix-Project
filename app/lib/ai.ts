export async function generateResponse(prompt: string) {
  // TODO: Implement AI response generation
   console.log(process.env.OPENROUTER_API_KEY);
   console.log(prompt);
  const response =await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "nvidia/nemotron-3-super-120b-a12b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

   const data = await response.json();
    console.log("Response data:", data);
    const reply = data.choices[0].message.content;

    return reply;
}