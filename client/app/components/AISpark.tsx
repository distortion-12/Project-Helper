"use client";
import { useState } from 'react';
import { Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AISpark() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<string[] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRoadmap(null);
    setTimeout(() => {
      setRoadmap([
        'Step 1: Research your idea and gather requirements.',
        'Step 2: Build a prototype using your chosen tech stack.',
        'Step 3: Test, iterate, and launch your project!'
      ]);
      setLoading(false);
    }, 1800);
  };

  return (
    <section id="ai" className="flex flex-col items-center justify-center py-24">
      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col items-center gap-6">
        <div className="relative w-full">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Describe your project idea..."
            className="w-full px-6 py-4 rounded-full bg-white/5 border-2 border-indigo-400/60 focus:border-indigo-400 outline-none text-white text-lg shadow-lg transition"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full shadow transition">
            <Brain className="w-5 h-5" />
          </button>
        </div>
      </form>
      <div className="mt-10 w-full max-w-xl">
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <BrainPulse />
              <span className="text-indigo-300 animate-pulse">Generating roadmap...</span>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {roadmap && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="mt-8"
            >
              <RoadmapTimeline steps={roadmap} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function BrainPulse() {
  return (
    <motion.div
      className="flex items-center justify-center"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.2 }}
    >
      <Brain className="w-12 h-12 text-indigo-400 drop-shadow-lg" />
    </motion.div>
  );
}

function RoadmapTimeline({ steps }: { steps: string[] }) {
  return (
    <ol className="border-l-2 border-indigo-400/40 pl-6 space-y-8">
      {steps.map((step, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-indigo-400 shadow-lg" />
          <span className="text-white/90 font-medium text-lg">{step}</span>
        </li>
      ))}
    </ol>
  );
}
