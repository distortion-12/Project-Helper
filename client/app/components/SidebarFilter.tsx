const techStacks = ['Python', 'Java', 'React', 'Next.js', 'Tailwind', 'Spring'];

export default function SidebarFilter() {
  return (
    <aside className="w-64 hidden md:block">
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg">
        <h3 className="font-semibold text-lg mb-4 text-indigo-300">Filter</h3>
        <div className="mb-6">
          <div className="font-medium mb-2">Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {techStacks.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-indigo-900/40 text-indigo-200 text-xs cursor-pointer hover:bg-indigo-700/60 transition">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="font-medium mb-2">Price Range</div>
          <input type="range" min="0" max="100" className="w-full accent-indigo-400" />
        </div>
      </div>
    </aside>
  );
}
