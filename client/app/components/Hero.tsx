"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const StartProjectForm = dynamic(() => import('./StartProjectForm'), { ssr: false });

export default function Hero() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] w-full px-4 md:px-16 py-12 gap-8 bg-transparent">
      <div className="flex-1 flex flex-col items-start justify-center text-left">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          <span className="block text-white">LET’S CREATE</span>
          <span className="block text-green-400">SOMETHING EPIC</span>
          <span className="block text-white">TOGETHER.</span>
        </motion.h1>
        <p className="text-lg md:text-2xl text-white/70 max-w-xl mb-8">
          The SaaS marketplace for student projects. Discover, build, or hire talent for your next big grade.
        </p>
        <button onClick={() => setShowForm(true)} className="inline-block px-8 py-3 rounded-full bg-green-500 hover:bg-green-400 text-black font-bold text-lg shadow-lg border border-green-400 transition-all duration-200" style={{ boxShadow: '0 2px 16px 0 #00ffb3a0' }}>
          START A PROJECT
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {/* Optionally, add an illustration or animation here */}
      </div>
    </section>
    <AnimatePresence>
      {showForm && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-gradient-to-br from-black via-zinc-900 to-black rounded-3xl shadow-2xl p-8 min-w-[350px] max-w-[95vw] relative border-2 border-green-700"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="absolute top-4 right-6 text-zinc-400 hover:text-white text-3xl font-bold focus:outline-none"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <StartProjectForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
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
