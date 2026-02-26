import { BadgeCheck } from 'lucide-react';

export default function ProjectCard({ title, tech, verified, github }: { title: string; tech: string[]; verified: boolean; github: string }) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-lg text-white/90">{title}</span>
        {verified && <BadgeCheck className="w-5 h-5 text-indigo-400" />}
      </div>
      <div className="flex gap-2 flex-wrap">
        {tech && tech.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-200 text-xs font-medium">
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-end mt-2">
        <a href={github} target="_blank" rel="noopener noreferrer" className="px-4 py-1 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition">View on GitHub</a>
      </div>
    </div>
  );
}
