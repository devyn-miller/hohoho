import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateAIResponse(
  userInput: string,
  context: string,
  score: number
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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
      temperature: 1.2,
      max_tokens: 100
    });

    return completion.choices[0].message.content || "Ho ho... ERROR! 🎅💻";
  } catch (error) {
    console.error('AI Response Error:', error);
    return "My crystal ball is foggy! Let's keep going! 🔮";
  }
}