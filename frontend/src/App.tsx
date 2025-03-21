import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import axios from 'axios';
import { MoodResponse } from './types';
import { FallingEmojis } from './components/FallingEmojis';
import { LoadingSpinner } from './components/LoadingSpinner';


const REMOODS_API_URL = process.env.REMOODS_API_URL || 'http://localhost:5000/api/mood';

function App() {
  const [subreddit, setSubreddit] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [moodData, setMoodData] = useState<MoodResponse | null>(null);

  const analyzeMood = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subreddit.trim()) {
      setError('Please enter a subreddit name');
      return;
    }

    setLoading(true);
    setError(null);
    setMoodData(null);

    try {
      const response = await axios.get(`${REMOODS_API_URL}/${subreddit}`);
      setMoodData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze mood');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-stretch overflow-hidden">
      <FallingEmojis />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 m-4 bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-500 rounded-3xl flex flex-col"
      >
        <div className="container mx-auto px-4 py-16 flex-1">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ scale: 0.9, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* <Pencil2Icon className="w-12 h-12" /> */}
              <h1 className="text-6xl font-bold text-gray-900">Remoods</h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-800"
            >
              Discover the emotional pulse of your favorite subreddits
            </motion.p>
          </motion.div>

          <motion.form
            onSubmit={analyzeMood}
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                placeholder="Enter a subreddit name (e.g., 'programming')"
                className="w-full pl-12 pr-[8.5rem] sm:pr-32 py-4 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/50 focus:outline-none focus:border-white shadow-lg text-lg"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-6 py-2 bg-black text-white rounded-full transition-colors disabled:opacity-50 hover:bg-gray-900 text-sm sm:text-base"
                >
                  {loading ? 'Analyzing...' : 'Analyze Mood'}
                </motion.button>
              </div>
            </div>
          </motion.form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto"
              >
                <LoadingSpinner />
              </motion.div>
            )}

            {moodData && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
                >
                  <div className="space-y-4">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-baseline gap-3"
                    >
                      <span className="text-xl font-semibold text-gray-700">Current Mood:</span>
                      <span className="text-3xl font-bold text-orange-500">
                        {moodData.mood}
                      </span>
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="text-xl font-semibold text-gray-700">Analysis:</span>
                      <p className="mt-2 text-gray-700 leading-relaxed">
                        {moodData.explanation}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="text-center py-4 text-gray-800">
          <p>Made with ❤️ by Prashant Patil</p>
          <p className="text-sm">© {new Date().getFullYear()} All rights reserved</p>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;