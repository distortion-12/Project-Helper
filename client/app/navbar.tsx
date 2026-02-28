"use client";
import React, { useState, useEffect } from "react";
import { FolderKanban } from "lucide-react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

const StartProjectForm = dynamic(() => import("./components/StartProjectForm"), { ssr: false });

export default function Navbar() {
  const [active, setActive] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "whatwedo", offset: 0 },
        { id: "projects", offset: 0 },
        { id: "company", offset: 0 },
      ];
      let found = "";
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) found = sec.id;
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 py-4 px-10 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2 font-extrabold text-2xl tracking-tight text-white drop-shadow-lg">
          <FolderKanban className="w-7 h-7 text-green-400" />
          <span><span className="text-green-400">Project</span>Nexus</span>
        </div>
        <ul className="flex gap-10 text-base font-semibold items-center">
          <li><a href="#whatwedo" className={"hover:text-green-400 transition " + (active === "whatwedo" ? "text-green-400" : "")}>What We Do</a></li>
          <li><a href="#categories" className={"hover:text-green-400 transition " + (active === "projects" ? "text-green-400" : "")}>Projects</a></li>
          <li><a href="#hire" className={"hover:text-green-400 transition " + (active === "company" ? "text-green-400" : "")}>Hire</a></li>
        </ul>
        <button
          className="ml-8 px-6 py-2 rounded-full bg-green-500 hover:bg-green-400 text-black font-bold text-base shadow-lg border border-green-400 transition-all duration-200"
          style={{ boxShadow: '0 2px 16px 0 #00ffb3a0' }}
          onClick={() => setShowForm(true)}
        >
          LET'S TALK ↗
        </button>
      </nav>
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