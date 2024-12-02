export const funnyResponses = {
  veryNaughty: [
    "Yikes! You're so naughty, even the coal miners are working overtime! 😈",
    "Santa just put you on speed dial... for his blocked contacts! 📵",
    "Breaking News: Your spot on the naughty list just got its own ZIP code! 📫",
    "Even the Grinch is taking notes from you! 📝",
  ],
  somewhatNaughty: [
    "You're walking the naughty-nice line like it's a tightrope... in crocs! 🎪",
    "Santa's elves are filing your case under 'It's Complicated' 📁",
    "Your guardian angel is requesting a transfer! 😇➡️😈",
  ],
  neutral: [
    "You're as middle-of-the-road as a confused penguin! 🐧",
    "Santa's checking this list thrice because he's just as confused as we are! 🤔",
    "You're like a Christmas cookie that's burnt on one side - still edible! 🍪",
  ],
  somewhatNice: [
    "You're nice... when someone's watching! 👀",
    "Santa's putting you on the 'nice-ish' list - yes, that exists now! ✨",
    "You're like diet nice - all the good behavior, none of the commitment! 🎄",
  ],
  veryNice: [
    "Whoa, are you secretly an elf? Because this level of nice is suspicious! 🧝‍♂️",
    "You're so nice, even your evil twin is only mildly mischievous! 👥",
    "Alert: Your halo is showing! But let's keep checking... 😇",
  ]
};

export function getFunnyResponse(score: number): string {
  if (score < 20) return funnyResponses.veryNaughty[Math.floor(Math.random() * funnyResponses.veryNaughty.length)];
  if (score < 40) return funnyResponses.somewhatNaughty[Math.floor(Math.random() * funnyResponses.somewhatNaughty.length)];
  if (score < 60) return funnyResponses.neutral[Math.floor(Math.random() * funnyResponses.neutral.length)];
  if (score < 80) return funnyResponses.somewhatNice[Math.floor(Math.random() * funnyResponses.somewhatNice.length)];
  return funnyResponses.veryNice[Math.floor(Math.random() * funnyResponses.veryNice.length)];
}