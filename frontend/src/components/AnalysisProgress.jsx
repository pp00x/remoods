import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const AnalysisProgress = ({ isAnalyzing = false }) => {
  return (
    <div className="w-full max-w-md">
      <div className="relative h-4 bg-black/50 rounded-full overflow-hidden border border-cyan-500">
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 
            ${isAnalyzing ? 'animate-gradient-x' : ''}`}
          style={{
            width: '200%',
            transform: isAnalyzing ? 'translateX(-50%)' : 'translateX(0%)',
          }}
        />
        <div 
          className={`absolute inset-y-0 bg-white/30 w-1
            ${isAnalyzing ? 'animate-scanning-line' : 'opacity-0'}`}
        />
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-3">
        {isAnalyzing && <LoadingSpinner size="sm" />}
        <span className="text-cyan-500 font-medium">
          {isAnalyzing ? "Analyzing subreddit..." : "Analysis Complete"}
        </span>
      </div>
    </div>
  );
};

export default AnalysisProgress;