"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center select-none bg-transparent">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold mb-6 relative"
        style={{
          background: 'linear-gradient(90deg, #6366f1, #a5b4fc, #6366f1)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'gradient-move 3s ease-in-out infinite',
        }}
      >
        <TypewriterHeadline />
      </motion.h1>
      <p className="text-lg md:text-2xl text-white/70 max-w-xl mx-auto">
        The SaaS marketplace for student projects. Discover, build, or hire talent for your next big grade.
      </p>
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}

function TypewriterHeadline() {
  // Animated, two-line, continuously looping headline
  const linePairs = [
    [
      'Build, Buy, or Hire',
      'your way to a Grade A Project.'
    ],
    [
      'Build',
      'your way to a Grade A Project.'
    ],
    [
      'Buy',
      'your way to a Grade A Project.'
    ],
    [
      'Hire',
      'your way to a Grade A Project.'
    ],
  ];
  const [pairIdx, setPairIdx] = React.useState(0);
  const [displayed, setDisplayed] = React.useState(['', '']);
  const [typing, setTyping] = React.useState(true);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    const [line1, line2] = linePairs[pairIdx];
    if (typing) {
      if (displayed[0].length < line1.length) {
        timeout = setTimeout(() => {
          setDisplayed([line1.slice(0, displayed[0].length + 1), '']);
        }, 30);
      } else if (displayed[1].length < line2.length) {
        timeout = setTimeout(() => {
          setDisplayed([line1, line2.slice(0, displayed[1].length + 1)]);
        }, 30);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayed(['', '']);
        setTyping(true);
        setPairIdx((prev) => (prev + 1) % linePairs.length);
      }, 700);
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, pairIdx, linePairs]);

  return (
    <span className="block min-h-[3.5em]">
      <span className="block">
        {displayed[0]}
        <span className="animate-pulse">|</span>
      </span>
      <span className="block mt-1">{displayed[1]}</span>
    </span>
  );
}
