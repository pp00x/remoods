import React from 'react';
import GlowText from './GlowText';
import Tooltip from './Tooltip';

const MoodCard = ({ moodData }) => {
  return (
    <div className="bg-black/50 backdrop-blur-sm border border-cyan-500 rounded-lg p-6 mt-8 w-full max-w-md 
                    transform transition-all duration-300 hover:scale-[1.02] hover:border-pink-500 
                    hover:shadow-neon-pink group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl flex items-center gap-2">
          <GlowText>r/{moodData.subreddit}</GlowText>
          <span className="text-sm text-cyan-400 opacity-75">mood analysis</span>
        </h2>
        <Tooltip content={`Current mood: ${moodData.mood}`}>
          {/* <div className="p-2">
            <MoodEmoji mood={moodData.mood} />
          </div> */}
        </Tooltip>
      </div>
      
      <div className="space-y-6">
        <div className="transform transition-all duration-300 hover:translate-x-2">
          <span className="text-cyan-500 group-hover:text-pink-500 transition-colors duration-300 font-medium">
            Current Mood:
          </span>
          <span className="ml-2 text-white">{moodData.mood}</span>
        </div>
        
        <div className="transform transition-all duration-300 hover:translate-x-2">
          <span className="text-cyan-500 group-hover:text-pink-500 transition-colors duration-300 font-medium">
            Analysis:
          </span>
          <p className="mt-2 text-white/90 leading-relaxed">
            {moodData.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoodCard;