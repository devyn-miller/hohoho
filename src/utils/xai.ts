export async function generateAIResponse(
  userInput: string,
  context: string,
  score: number
): Promise<string> {
  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_XAI_API_KEY}`
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are Santa's sassy helper who tends to be judgmental and gives funny, slightly inappropriate (but family-friendly) responses. Current naughty-nice score: ${score}/100. Context: ${context}`
          },
          {
            role: "user",
            content: userInput
          }
        ],
        model: "grok-beta",
        temperature: 1.2,
        max_tokens: 100
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || "Ho ho... ERROR! 🎅💻";
  } catch (error) {
    console.error('AI Response Error:', error);
    return "My crystal ball is foggy! Let's keep going! 🔮";
  }
}