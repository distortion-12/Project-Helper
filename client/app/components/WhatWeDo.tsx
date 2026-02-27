import React from "react";

const WHAT_WE_DO = [
  {
    title: "AI & Machine Learning",
    desc: "Projects using AI, ML, NLP, and deep learning.",
    icon: "🤖",
    anchor: "#ai"
  },
  {
    title: "Web & SaaS",
    desc: "Modern web apps, SaaS, dashboards, and more.",
    icon: "🌐",
    anchor: "#web"
  },
  {
    title: "Data Science",
    desc: "Data analysis, visualization, and science projects.",
    icon: "📊",
    anchor: "#data"
  },
  {
    title: "Cybersecurity",
    desc: "Security, privacy, and protection projects.",
    icon: "🛡️",
    anchor: "#cyber"
  },
];

export default function WhatWeDo() {
  return (
    <section id="whatwedo" className="w-full py-16 px-4 md:px-16 bg-black">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-green-400">What We Do</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {WHAT_WE_DO.map((item) => (
          <a
            key={item.title}
            href={item.anchor}
            className="rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-black border-2 border-green-700 shadow-xl p-8 flex flex-col items-center gap-4 hover:scale-105 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-green-400/40"
          >
            <span className="text-4xl mb-2">{item.icon}</span>
            <span className="text-xl font-bold text-green-300 group-hover:text-green-400 mb-1">{item.title}</span>
            <span className="text-zinc-300 text-center text-base">{item.desc}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
