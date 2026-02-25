"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center py-16 select-none">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-200 mb-6"
      >
        <TypewriterHeadline />
      </motion.h1>
      <p className="text-lg md:text-2xl text-white/70 max-w-xl">
        The SaaS marketplace for student projects. Discover, build, or hire talent for your next big grade.
      </p>
    </section>
  );
}

function TypewriterHeadline() {
  // Simple typewriter effect (replace with a library for more realism)
  const text = "Build, Buy, or Hire your way to a Grade A Project.";
  const [displayed, setDisplayed] = React.useState('');
  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, []);
  return <span>{displayed}<span className="animate-pulse">|</span></span>;
}
