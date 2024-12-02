import React, { useState, useCallback } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { ScoreDisplay } from './components/ScoreDisplay';
import { ShareResults } from './components/ShareResults';
import { Message } from './types';
import { analyzeResponse, getNextQuestion, generateResponse } from './utils/chatLogic';

function App() {
  const [messages, setMessages] = useState<Message[]>([{
    content: "Ho ho ho! 🎅 I'm Santa's sassiest helper! Let's see if you've been naughty or nice this year... or maybe both? 😈 Ready to spill the tea?",
    sender: 'bot'
  }]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(50);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [finalVerdict, setFinalVerdict] = useState('');

  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    const newMessages = [...messages, { content: userInput, sender: 'user' as const }];
    setMessages(newMessages);
    setUserInput('');

    const currentQuestion = getNextQuestion(questionIndex);
    
    if (currentQuestion) {
      const responseScore = analyzeResponse(userInput, currentQuestion);
      setScore(prevScore => Math.min(100, Math.max(0, prevScore + (responseScore - 10))));
    }

    const nextQuestion = getNextQuestion(questionIndex + 1);
    const isLast = !nextQuestion;
    
    try {
      const botResponse = await generateResponse(userInput, score, isLast);
      
      if (isLast) {
        setFinalVerdict(botResponse);
      }
      
      setMessages(prev => [
        ...prev,
        { content: botResponse, sender: 'bot' as const },
        ...(nextQuestion ? [{ content: nextQuestion.text, sender: 'bot' as const }] : [])
      ]);
    } catch (error) {
      console.error('Error generating response:', error);
    }

    setQuestionIndex(prev => prev + 1);
    setIsLoading(false);
  }, [userInput, messages, questionIndex, score, isLoading]);

  const handleReset = () => {
    setMessages([{
      content: "Ho ho ho! 🎅 I'm Santa's sassiest helper! Let's see if you've been naughty or nice this year... or maybe both? 😈 Ready to spill the tea?",
      sender: 'bot'
    }]);
    setScore(50);
    setQuestionIndex(-1);
    setUserInput('');
    setFinalVerdict('');
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1544885935-98dd03b09034?q=80&w=1920')] bg-cover bg-fixed">
      <div className="min-h-screen bg-black/50 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <ScoreDisplay score={score} />
          <ChatWindow
            messages={messages}
            userInput={userInput}
            onInputChange={setUserInput}
            onSendMessage={handleSendMessage}
            onReset={handleReset}
            isLoading={isLoading}
          />
          {finalVerdict && (
            <div className="flex justify-center">
              <ShareResults score={score} finalVerdict={finalVerdict} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;