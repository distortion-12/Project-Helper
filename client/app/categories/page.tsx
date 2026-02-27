"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "../components/ContactForm";
import { BookOpen, Shield, Cpu, Globe, Users, BarChart2, Music, ShoppingCart, Activity, Lock } from "lucide-react";


// High-level categories and their tag mappings
const CATEGORY_MAP = [
  { key: "AI & Machine Learning", icon: Cpu, tags: ["ai", "nlp", "deep learning", "tensorflow", "keras", "rasa", "machine learning", "openai", "gpt-3", "cnn", "lstm", "arima", "recommender"] },
  { key: "Cybersecurity", icon: Shield, tags: ["cybersecurity", "ids", "scanner", "network", "simulator", "logs", "wifi", "malware", "phishing", "vulnerability", "keylogger", "firewall", "ransomware"] },
  { key: "Data Science", icon: BarChart2, tags: ["data science", "clustering", "recommender", "pandas", "arima", "ml", "eda", "dash", "plotly", "data visualization"] },
  { key: "Web & SaaS", icon: Globe, tags: ["web app", "saas", "node.js", "react", "javascript", "stripe", "postgresql", "e-commerce", "dashboard", "kanban", "online learning", "collaboration", "code editor"] },
  { key: "Finance", icon: ShoppingCart, tags: ["finance", "stock", "credit card", "churn", "personal finance", "trading"] },
  { key: "Music & Audio", icon: Music, tags: ["music", "audio"] },
  { key: "Productivity", icon: Activity, tags: ["project management", "collaboration", "productivity", "tracker"] },
  { key: "Education", icon: BookOpen, tags: ["learning", "courses", "education"] },
  { key: "Privacy & Security", icon: Lock, tags: ["password", "vulnerability", "keylogger", "firewall", "ransomware"] },
  { key: "Other", icon: Users, tags: [] },
];

async function fetchProjects() {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}


export default function CategoriesPage() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data.projects || []);
    });
  }, []);


  // Map each project to a high-level category
  function getCategoryForProject(project) {
    let tags = [];
    if (Array.isArray(project.tech)) {
      tags = project.tech.map(t => t.toLowerCase());
    } else if (typeof project.tech === 'string') {
      tags = project.tech.replace(/[{}]/g, '').split(',').map(t => t.trim().toLowerCase());
    } else if (Array.isArray(project.tags)) {
      tags = project.tags.map(t => t.toLowerCase());
    }
    for (const cat of CATEGORY_MAP) {
      if (cat.tags.some(tag => tags.includes(tag.toLowerCase()))) {
        return cat.key;
      }
    }
    return "Other";
  }

  // Group projects by category
  const projectsByCategory = CATEGORY_MAP.reduce((acc, cat) => {
    acc[cat.key] = projects.filter(p => getCategoryForProject(p) === cat.key);
    return acc;
  }, {});

  const filteredProjects = selectedCategory
    ? projectsByCategory[selectedCategory] || []
    : [];



  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-left">
        <span className="text-green-400">Browse by Category</span>
      </h1>
      {!selectedCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {CATEGORY_MAP.map(({ key, icon: Icon }) => (
            <button
              key={key}
              className="rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-black hover:from-green-900 hover:to-green-700 transition-all duration-200 p-10 text-2xl font-bold shadow-2xl border-2 border-zinc-800 flex flex-col items-center gap-4 group hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400/40"
              onClick={() => setSelectedCategory(key)}
            >
              <Icon className="w-12 h-12 text-green-400 group-hover:scale-110 transition-transform" />
              <span>{key}</span>
              <span className="text-xs text-green-300 mt-2">{projectsByCategory[key]?.length || 0} Projects</span>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            className="mb-6 px-4 py-2 bg-zinc-800 rounded hover:bg-indigo-600 transition"
            onClick={() => setSelectedCategory(null)}
          >
            ← Back to Categories
          </button>
          <h2 className="text-2xl font-bold mb-4">{selectedCategory} Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id || project.title}
                className="rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-black p-8 shadow-2xl border-2 border-zinc-800 flex flex-col justify-between cursor-pointer hover:ring-4 hover:ring-green-400/40 transition-all duration-200 hover:scale-105"
                onClick={() => setSelectedProject(project)}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-green-400">{project.title || project.name}</h3>
                  <p className="mb-4 text-zinc-300 text-base">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(
                      Array.isArray(project.tech)
                        ? project.tech
                        : typeof project.tech === "string"
                          ? project.tech.replace(/[{}]/g, '').split(',').map(t => t.trim()).filter(Boolean)
                          : Array.isArray(project.tags)
                            ? project.tags
                            : typeof project.tags === "string"
                              ? project.tags.replace(/[{}]/g, '').split(',').map(t => t.trim()).filter(Boolean)
                              : []
                    ).map((tag) => (
                      <span
                        key={tag}
                        className="bg-green-700/30 text-green-200 px-2 py-1 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-zinc-400">No projects found in this category.</div>
            )}
          </div>
        {/* Modal for Project Details and Contact Form */}
        <AnimatePresence>
          {selectedProject && (
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
                  onClick={() => { setSelectedProject(null); setShowContact(false); }}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-3xl font-extrabold mb-2 text-green-400">{selectedProject.title || selectedProject.name}</h3>
                <p className="mb-6 text-zinc-200 text-lg">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(
                    Array.isArray(selectedProject.tech)
                      ? selectedProject.tech
                      : typeof selectedProject.tech === "string"
                        ? selectedProject.tech.replace(/[{}]/g, '').split(',').map(t => t.trim()).filter(Boolean)
                        : Array.isArray(selectedProject.tags)
                          ? selectedProject.tags
                          : typeof selectedProject.tags === "string"
                            ? selectedProject.tags.replace(/[{}]/g, '').split(',').map(t => t.trim()).filter(Boolean)
                            : []
                  ).map((tag) => (
                    <span
                      key={tag}
                      className="bg-green-700/30 text-green-200 px-3 py-1 rounded-full text-sm font-semibold tracking-wide shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {!showContact && (
                  <button
                    className="w-full mt-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black rounded-full font-bold text-lg shadow-lg border border-green-400 transition-all duration-200"
                    onClick={() => setShowContact(true)}
                  >
                    Connect to Admin for Project Help
                  </button>
                )}
                {showContact && (
                  <ContactForm onClose={() => setShowContact(false)} />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      )}
    </div>
  );
}
