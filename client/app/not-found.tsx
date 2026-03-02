'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4 text-green-400">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-zinc-400 mb-8 text-lg">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black rounded-full font-bold transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
