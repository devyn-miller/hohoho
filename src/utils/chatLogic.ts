import { Question } from '../types';
import { standardQuestions, naughtyQuestions, niceQuestions, redemptionQuestions } from './questions';
import { getFunnyResponse } from './responses';
import { generateAIResponse } from './xai';

// Keep track of asked questions to avoid repetition
let askedQuestions = new Set<string>();

function getRandomQuestion(questions: Question[]): Question | null {
  const unaskedQuestions = questions.filter(q => !askedQuestions.has(q.text));
  if (unaskedQuestions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * unaskedQuestions.length);
  const question = unaskedQuestions[randomIndex];
  askedQuestions.add(question.text);
  return question;
}

export function analyzeResponse(response: string, question: Question): number {
  const normalizedResponse = response.toLowerCase();
  
  const hasPositive = question.positiveKeywords.some(keyword => 
    normalizedResponse.includes(keyword.toLowerCase())
  );
  
  const hasNegative = question.negativeKeywords.some(keyword => 
    normalizedResponse.includes(keyword.toLowerCase())
  );
  
  // More dramatic scoring
  if (hasPositive && !hasNegative) return 25; // Extra nice bonus
  if (!hasPositive && hasNegative) return -5; // Extra naughty penalty
  if (hasPositive && hasNegative) return 5;   // Conflicting answers
  return 10; // Neutral response
}

export function getNextQuestion(currentIndex: number, score: number): Question | null {
  // End after 5 questions
  if (currentIndex >= 4) {
    askedQuestions.clear(); // Reset for next conversation
    return null;
  }
  
  // First question is always from standard pool
  if (currentIndex === 0) {
    return getRandomQuestion(standardQuestions);
  }
  
  // Select questions based on current score and previous answers
  if (score < 30) {
    // Mix of naughty and redemption questions
    return getRandomQuestion(Math.random() < 0.7 ? naughtyQuestions : redemptionQuestions);
  } else if (score > 70) {
    // Mix of nice and challenging questions
    return getRandomQuestion(Math.random() < 0.7 ? niceQuestions : naughtyQuestions);
  }
  
  // For middle scores, mix all types
  const allQuestions = [
    ...standardQuestions,
    ...naughtyQuestions,
    ...niceQuestions
  ];
  return getRandomQuestion(allQuestions);
}

export async function generateResponse(
  userInput: string,
  score: number,
  isLastQuestion: boolean
): Promise<string> {
  if (isLastQuestion) {
    askedQuestions.clear(); // Reset for next conversation
    
    // Calculate naughty-nice percentage
    const nicePercentage = Math.round(score);
    const naughtyPercentage = 100 - nicePercentage;
    
    if (score < 30) {
      return `🎅 FINAL VERDICT: ${naughtyPercentage}% NAUGHTY, ${nicePercentage}% NICE! 📊\n\n` +
             `Oh sugar plums... you're so naughty, even the coal miners are working overtime! 😈\n` +
             `But don't worry, there's still hope - maybe try blaming it on your evil twin next year? 😅`;
    } else if (score > 70) {
      return `🎅 FINAL VERDICT: ${nicePercentage}% NICE, ${naughtyPercentage}% NAUGHTY! 📊\n\n` +
             `Well butter my biscuit and call me an elf! You're so nice, you make angels look like troublemakers! 😇\n` +
             `Santa's gonna need a bigger sleigh... and maybe some protein shakes for those reindeer! 💪`;
    } else {
      return `🎅 FINAL VERDICT: ${nicePercentage}% NICE, ${naughtyPercentage}% NAUGHTY! 📊\n\n` +
             `You're riding that naughty-nice line like a penguin on a unicycle! 🐧\n` +
             `Santa's gonna need a spreadsheet to figure you out... and maybe a therapy session! 😅`;
    }
  }

  try {
    const aiResponse = await generateAIResponse(
      userInput,
      score < 30 ? 
        `Being sassy and dramatic about their ${Math.round(score)}% nice score` :
      score > 70 ? 
        `Being impressed but playful about their ${Math.round(score)}% nice score` :
        `Being dramatically uncertain about their perfectly balanced ${Math.round(score)}% nice score`,
      score
    );
    return aiResponse;
  } catch (error) {
    // Fallback responses with scores
    if (score < 30) {
      return `[Current Nice Score: ${Math.round(score)}%] Oh honey... even the Grinch is taking notes! 😅`;
    } else if (score > 70) {
      return `[Current Nice Score: ${Math.round(score)}%] Wow, are you secretly a unicorn in disguise? 🦄`;
    } else {
      return `[Current Nice Score: ${Math.round(score)}%] You're like a Christmas cookie - sweet but with a hint of spice! 🍪`;
    }
  }
}