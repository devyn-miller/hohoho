import { Question } from '../types';
import { questions } from './questions';
import { getFunnyResponse } from './responses';
import { generateAIResponse } from './xai';

export function analyzeResponse(response: string, question: Question): number {
  const normalizedResponse = response.toLowerCase();
  
  const hasPositive = question.positiveKeywords.some(keyword => 
    normalizedResponse.includes(keyword.toLowerCase())
  );
  
  const hasNegative = question.negativeKeywords.some(keyword => 
    normalizedResponse.includes(keyword.toLowerCase())
  );
  
  if (hasPositive && !hasNegative) return 20;
  if (!hasPositive && hasNegative) return 0;
  return 10;
}

export function getNextQuestion(currentIndex: number): Question | null {
  if (currentIndex >= questions.length) return null;
  return questions[currentIndex];
}

export async function generateResponse(
  userInput: string,
  score: number,
  isLastQuestion: boolean
): Promise<string> {
  const funnyResponse = getFunnyResponse(score);
  
  if (isLastQuestion) {
    const finalVerdict = await generateAIResponse(
      userInput,
      "This is the final verdict",
      score
    );
    return `${funnyResponse}\n\n${finalVerdict}`;
  }

  try {
    const aiResponse = await generateAIResponse(
      userInput,
      "Responding to user's answer",
      score
    );
    return aiResponse;
  } catch (error) {
    return funnyResponse;
  }
}