import React from 'react';
import { Star } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const getStatus = () => {
    if (score >= 75) return { text: "Very Nice! 🎅", color: "text-green-600" };
    if (score >= 50) return { text: "Nice 🎄", color: "text-green-500" };
    if (score >= 25) return { text: "Getting Better 🤔", color: "text-yellow-500" };
    return { text: "Naughty List 😈", color: "text-red-500" };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Niceness Score
        </h3>
        <span className={`font-bold ${status.color}`}>{status.text}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-red-500 to-green-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}