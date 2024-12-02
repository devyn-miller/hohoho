export interface Message {
  content: string;
  sender: 'user' | 'bot';
}

export interface Question {
  text: string;
  positiveKeywords: string[];
  negativeKeywords: string[];
}