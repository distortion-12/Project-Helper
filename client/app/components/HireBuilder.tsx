"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { label: 'Project Title', key: 'title', placeholder: 'e.g. Smart Attendance System' },
  { label: 'Problem Statement', key: 'problem', placeholder: 'Describe the problem...' },
  { label: 'Tech Stack Requirements', key: 'tech', placeholder: 'e.g. Python, React' },
  { label: 'Budget', key: 'budget', placeholder: 'e.g. $100' },
  { label: 'Deadline', key: 'deadline', placeholder: 'e.g. 2026-03-15' },
];


export default function HireBuilder() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [steps[step].key]: e.target.value });
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else setSubmitted(true);
  };

  return (
    <section id="hire" className="flex flex-col items-center justify-center py-24 bg-transparent">
      <div className="w-full max-w-xl bg-white/5 rounded-3xl p-10 border border-white/10 shadow-2xl flex flex-col gap-8">
        <h2 className="text-3xl font-extrabold text-indigo-300 text-center tracking-tight mb-2">Hire a Builder</h2>
        <ProgressBar step={step} total={steps.length} />
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              <label className="block text-lg font-semibold text-white/90 mb-1 text-left">
                {steps[step].label}
                <span className="ml-2 text-xs text-indigo-200 font-normal">({step + 1}/{steps.length})</span>
              </label>
              {step === 1 ? (
                <textarea
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white text-base focus:ring-2 focus:ring-indigo-400 outline-none transition mb-2 resize-none min-h-[96px]"
                  placeholder={steps[step].placeholder}
                  value={form[steps[step].key] || ''}
                  onChange={handleChange}
                  rows={4}
                  autoFocus
                />
              ) : (
                <input
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white text-base focus:ring-2 focus:ring-indigo-400 outline-none transition mb-2"
                  placeholder={steps[step].placeholder}
                  value={form[steps[step].key] || ''}
                  onChange={handleChange}
                  type={step === 3 ? 'number' : step === 4 ? 'date' : 'text'}
                  autoFocus
                />
              )}
              <div className="flex items-center justify-between mt-2">
                <button
                  className="px-8 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  onClick={handleNext}
                  type="button"
                >
                  {step < steps.length - 1 ? 'Next' : 'Submit'}
                </button>
                <span className="text-xs text-white/40">Step {step + 1} of {steps.length}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="text-2xl text-indigo-300 font-extrabold mb-2">🎉 Submitted!</div>
              <div className="text-white/80 text-lg">Thank you for your request.<br/>We'll match you with the best student builders soon.</div>
              <button
                className="mt-4 px-6 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition"
                onClick={() => { setStep(0); setForm({}); setSubmitted(false); }}
              >
                Post Another Project
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
      <div
        className="h-full bg-indigo-400 transition-all duration-500"
        style={{ width: `${((step + 1) / total) * 100}%` }}
      />
    </div>
  );
}
