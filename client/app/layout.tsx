

import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-black text-white min-h-screen transition-colors duration-300 font-sans">
        <Navbar />
        <main className="min-h-[80vh] flex flex-col items-stretch justify-start bg-gradient-to-br from-black via-zinc-900 to-black">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

// --- Navbar Component ---

import Navbar from './navbar';

// --- Footer Component ---
function Footer() {
  return (
    <footer className="mt-24 py-8 text-center text-xs text-green-400 border-t border-green-700 bg-black/90">
      © {new Date().getFullYear()} <span className="font-bold">ProjectNexus</span>. All rights reserved.
    </footer>
  );
}
