import React from 'react';
import { motion } from 'framer-motion';

const emojis = ['😊', '😢', '😡', '🤔', '😍', '😎', '🤣', '😤', '🥳', '😌'];

const FallingEmoji: React.FC<{ emoji: string, delay: number }> = ({ emoji, delay }) => {
  return (
    <motion.div
      initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 0 }}
      animate={{
        y: window.innerHeight + 20,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute text-black/10 text-2xl pointer-events-none"
    >
      {emoji}
    </motion.div>
  );
};

export const FallingEmojis: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {emojis.map((emoji, index) => (
        <FallingEmoji
          key={index}
          emoji={emoji}
          delay={index * 0.5}
        />
      ))}
    </div>
  );
};