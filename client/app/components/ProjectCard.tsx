import { BadgeCheck } from 'lucide-react';

export default function ProjectCard({ title, tech, price, verified }: { title: string; tech: string[]; price: number; verified: boolean }) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-lg text-white/90">{title}</span>
        {verified && <BadgeCheck className="w-5 h-5 text-indigo-400" title="Verified" />}
      </div>
      <div className="flex gap-2 flex-wrap">
        {tech.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-200 text-xs font-medium">
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-indigo-300 font-bold text-xl">${price}</span>
        <button className="px-4 py-1 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition">View Details</button>
      </div>
    </div>
  );
}
