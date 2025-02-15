import { useEffect, useState } from "react";

interface EmojiPosition {
    emoji: string;
    position: { top: string; left: string };
    animationClass: string;
  }

// List of food emojis
const foodEmojis = [
  "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🫐", "🥝",
  "🍅", "🫒", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️", "🫑", "🥒", "🥬", "🥦", "🧄", "🧅", "🥜",
  "🫘", "🌰", "🫚", "🫛", "🍞", "🥐", "🥖", "🫓", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩",
  "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "🫕",
  "🥣", "🥗", "🍿", "🧈", "🧂", "🥫", "🍝", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍠", "🍢", "🍣",
  "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧",
  "🍫", "🍬", "🍭", "🍮", "🍯"
];

// Function to shuffle an array (Fisher-Yates Shuffle)
const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };  

  // Function to generate a position that avoids overlapping
  const getNonOverlappingPosition = (existingPositions: { top: number; left: number }[], attempts = 0) => {
    const newPos = {
      top: Math.random() * 90, // vh unit
      left: Math.random() * 90 // vw unit
    };
  
    const minDistance = 8; // Minimum distance in vh/vw units
  
    const isTooClose = existingPositions.some(
      (pos) => Math.abs(pos.top - newPos.top) < minDistance && Math.abs(pos.left - newPos.left) < minDistance
    );
  
    // If too close to another emoji, try again (max attempts: 10)
    if (isTooClose && attempts < 10) {
      return getNonOverlappingPosition(existingPositions, attempts + 1);
    }
    return newPos;
  };
  

export default function FoodEmojis() {
  const [emojiPositions, setEmojiPositions] = useState<EmojiPosition[]>([]);

  useEffect(() => {
    const uniqueEmojis = shuffleArray(foodEmojis).slice(0, 100);

    const positions: EmojiPosition[] = [];
    const existingPositions: { top: number; left: number }[] = [];

    uniqueEmojis.forEach((emoji) => {
      const position = getNonOverlappingPosition(existingPositions);
      existingPositions.push(position); // Store used positions to prevent overlap

      positions.push({
        emoji,
        position: { top: `${position.top}vh`, left: `${position.left}vw` },
        animationClass: `animate-bounce-${Math.floor(Math.random() * 3) + 1}`
      });
    });

    setEmojiPositions(positions);
  }, []);


  return (
    <div className="absolute inset-0 flex justify-center items-center z-0">
      {emojiPositions.map((item, index) => (
        <span
          key={index}
          className={`absolute text-7xl ${item.animationClass}`}
          style={{ top: item.position.top, left: item.position.left }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}