import React, { useState } from 'react';
import StarBackground from './components/StarBackground';
import SearchBar from './components/SearchBar';
import MoodCard from './components/MoodCard';
import GlowText from './components/GlowText';
import ErrorBoundary from './components/ErrorBoundry';

function App() {
  const [moodData, setMoodData] = useState(null);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <StarBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <header className="text-center mb-12 animate-float">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <GlowText>Remoods</GlowText>
          </h1>
          <p className="text-cyan-400 text-lg md:text-xl max-w-2xl mx-auto">
            Discover the emotional pulse of your favorite subreddits
          </p>
        </header>

        <ErrorBoundary>
          <main className="flex flex-col items-center justify-center gap-8">
            <SearchBar setMoodData={setMoodData} />
            {moodData && <MoodCard moodData={moodData} />}
          </main>
        </ErrorBoundary>

        <footer className="mt-12 text-center text-cyan-400/50 text-sm">
          <p>Made with ❤️ by Prashant Patil</p>
        </footer>
      </div>
    </div>
  );
}

export default App;