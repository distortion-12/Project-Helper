"use client";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-glass border-b border-white/10 py-3 px-8 flex items-center justify-between shadow-xl">
      <div className="font-extrabold text-xl tracking-tight text-indigo-400 drop-shadow-lg">ProjectNexus</div>
      <ul className="flex gap-8 text-base font-semibold">
        <li><a href="#explore" className="hover:text-indigo-300 transition">Explore Projects</a></li>
        <li><a href="#hire" className="hover:text-indigo-300 transition">Hire a Builder</a></li>
        <li><a href="#ai" className="hover:text-indigo-300 transition">AI Idea Spark</a></li>
        <li><a href="#dashboard" className="hover:text-indigo-300 transition">My Dashboard</a></li>
      </ul>
    </nav>
  );
}