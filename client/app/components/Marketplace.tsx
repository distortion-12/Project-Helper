"use client";
import SidebarFilter from './SidebarFilter';
import ProjectCard from './ProjectCard';
import { useEffect, useState, useCallback } from 'react';

type Project = {
  id: number;
  title: string;
  tech: string[];
  verified: boolean;
  github: string;
  // category: string; // Not in Supabase table
  price?: number;
};

export default function Marketplace() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  // Filter state
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  // Fetch projects with filters
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedTech) params.append('tech', selectedTech);
    if (minPrice > 0) params.append('minPrice', String(minPrice));
    if (maxPrice < 100000) params.append('maxPrice', String(maxPrice));
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects${params.size ? '?' + params.toString() : ''}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      setProjects(json.data || []);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [selectedTech, minPrice, maxPrice]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Group by tech[0] as pseudo-category for display
  const categories = Array.from(new Set(projects.map(p => p.tech?.[0] || 'Other')));

  return (
    <section id="explore" className="flex flex-col md:flex-row gap-8 px-2 md:px-8 py-8 md:py-16 w-full">
      <div className="md:w-64 w-full md:sticky top-24 z-10 mb-4 md:mb-0">
        <SidebarFilter
          selectedTech={selectedTech}
          onTechChange={setSelectedTech}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        />
      </div>
      <div className="flex-1 flex flex-col gap-8">
        {loading ? (
          <div className="flex justify-center items-center h-40 text-indigo-300 animate-pulse">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-white/70">
            <span className="text-2xl mb-2">No projects found.</span>
            <span className="text-indigo-400">Try adjusting your filters or check back later.</span>
          </div>
        ) : (
          categories.map(category => (
            <div key={category} className="bg-white/5 rounded-2xl p-4 md:p-6 border border-white/10 shadow-lg">
              <h3 className="font-semibold text-lg mb-4 text-indigo-300">{category} Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projects.filter(p => (p.tech?.[0] || 'Other') === category).map((p) => (
                  <ProjectCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}