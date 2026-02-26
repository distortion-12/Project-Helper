import { useState } from 'react';

const techStacks = ['Python', 'Java', 'React', 'Next.js', 'Tailwind', 'Spring'];

type Props = {
  selectedTech: string | null;
  onTechChange: (tech: string | null) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
};

export default function SidebarFilter({ selectedTech, onTechChange, minPrice, maxPrice, onPriceChange }: Props) {
  const [showTech, setShowTech] = useState(true);


  return (
    <aside className="w-full md:w-64">
      <div className="bg-white/5 rounded-2xl p-4 border border-white/10 shadow-lg">
        <h3 className="font-bold text-xl mb-4 text-indigo-300 tracking-wide">Filters</h3>

        {/* Tech Stack Filter */}
        <div className="mb-6 border-b border-white/10 pb-4">
          <button
            className="flex items-center justify-between w-full font-semibold text-indigo-200 mb-2 focus:outline-none"
            onClick={() => setShowTech(v => !v)}
            type="button"
          >
            Tech Stack
            <span className="ml-2">{showTech ? '▲' : '▼'}</span>
          </button>
          {showTech && (
            <div className="flex flex-col gap-2 pl-1">
              {techStacks.map((tech) => (
                <label key={tech} className="flex items-center gap-2 cursor-pointer text-indigo-100 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedTech === tech}
                    onChange={() => onTechChange(selectedTech === tech ? null : tech)}
                    className="accent-indigo-500 w-4 h-4 rounded"
                  />
                  {tech}
                </label>
              ))}
            </div>
          )}
        </div>



        {/* Clear Filters Button */}
        <button
          className="mt-4 w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          onClick={() => {
            onTechChange(null);
            onPriceChange(0, 100000);
          }}
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  );
}
