import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareResultsProps {
  score: number;
  finalVerdict: string;
}

export function ShareResults({ score, finalVerdict }: ShareResultsProps) {
  const handleShare = async () => {
    const shareText = `🎅 Santa's Verdict: ${finalVerdict}\n🎄 My Naughty-Nice Score: ${score}/100\n\nFind out your score at [Your App URL]`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Santa's List Results",
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert("Results copied to clipboard! 📋✨");
      }
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
    >
      <Share2 className="w-5 h-5" />
      Share Results
    </button>
  );
}