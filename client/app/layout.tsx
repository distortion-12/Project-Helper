

import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-charcoal text-white min-h-screen transition-colors duration-300">
          <Navbar />
          <main>{children}</main>
          <Footer />
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
    <footer className="mt-24 py-8 text-center text-xs text-white/40 border-t border-white/10 bg-glass">
      © {new Date().getFullYear()} ProjectNexus. All rights reserved.
    </footer>
  );
}
