const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE"; 

async function processQuestion(question) {
    const randomSeed = Math.floor(Math.random() * 100000);
    const questionWithSeed = `${question} [variation_id: ${randomSeed}]`;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
            role: "system",
            content: `You are an AI geographer and travel assistant. You take natural language questions about the Earth and return structured JSON with this exact format:
            {
                location: string (a real, mappable place),
                topic: string (e.g. flooding, vacation, pollution),
                timeframe: string (e.g. 'May', 'past 5 years'),
                intent: string (e.g. analyze risk, seek advice),
                caption: string (a 1-sentence recommendation or insight)
            }

            If the user doesn’t mention a location, infer the most likely or helpful one. If the same question is asked repeatedly, suggest a **different interesting location** each time to encourage exploration. Always return real-world, mappable locations.`,

        },
        
        {
          role: "user",
          content: `${questionWithSeed}\nReturn a different destination each time, even if the question is the same. Prioritize novelty and diversity.`
        }
      ],
      temperature: 0.8
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;

  try {
    return JSON.parse(reply);
  } catch (e) {
    console.error("Failed to parse JSON:", reply);
    return null;
  }
}