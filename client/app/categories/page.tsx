"use client";
import React, { useEffect, useState } from "react";
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
      <h1 className="text-3xl font-bold mb-8">Browse by Category</h1>
      {!selectedCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {CATEGORY_MAP.map(({ key, icon: Icon }) => (
            <button
              key={key}
              className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 hover:from-indigo-700 hover:to-indigo-900 transition p-8 text-2xl font-bold shadow-xl border border-zinc-800 flex flex-col items-center gap-4 group"
              onClick={() => setSelectedCategory(key)}
            >
              <Icon className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>{key}</span>
              <span className="text-xs text-indigo-200 mt-2">{projectsByCategory[key]?.length || 0} Projects</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id || project.title}
                className="rounded-xl bg-zinc-900 p-6 shadow-lg border border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">{project.title || project.name}</h3>
                  <p className="mb-4 text-zinc-300 text-sm">{project.description}</p>
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
                        className="bg-indigo-700/30 text-indigo-200 px-2 py-1 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Optionally, add a button to view more details */}
              </div>
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-zinc-400">No projects found in this category.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
