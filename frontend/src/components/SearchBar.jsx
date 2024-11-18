import React, { useState } from 'react';
import { fetchMood } from '../services/api';
import AnalysisProgress from './AnalysisProgress';

const SearchBar = ({ setMoodData }) => {
  const [subreddit, setSubreddit] = useState('');
  const [error, setError] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!subreddit.trim()) return;
    
    setIsAnalyzing(true);
    setError('');
    setMoodData(null);
    
    try {
      const data = await fetchMood(subreddit.trim());
      setMoodData(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze subreddit. Please try again.');
      setMoodData(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col items-center gap-4 w-full max-w-md">
      <div className="relative w-full">
        <div 
          className={`absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/50 via-pink-500/50 to-purple-500/50 
                      blur-md transition-opacity duration-300 ${isInputFocused ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <input
          type="text"
          placeholder="Enter subreddit name"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          disabled={isAnalyzing}
          className="relative w-full px-4 py-3 bg-black/80 border-2 border-cyan-500 text-cyan-500 
                     placeholder-cyan-700 focus:outline-none focus:border-pink-500 rounded-lg 
                     backdrop-blur-sm transition-all duration-300 hover:border-pink-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      
      {!isAnalyzing ? (
        <button
          type="submit"
          disabled={!subreddit.trim() || isAnalyzing}
          className="relative px-8 py-3 rounded-lg overflow-hidden group
                     transition-transform duration-300 hover:scale-105 disabled:opacity-50
                     disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                         bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 blur-lg" />
          <span className="relative text-white font-bold">
            Analyze Mood
          </span>
        </button>
      ) : (
        <AnalysisProgress isAnalyzing={isAnalyzing} />
      )}
      
      {error && (
        <div className="text-red-500 text-center text-sm bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/50">
          {error}
        </div>
      )}
    </form>
  );
};

export default SearchBar;