'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 py-4 md:px-12 md:py-5 flex items-center justify-between">
        <a
          href="#"
          className={`text-lg font-bold tracking-tighter transition-colors duration-500 ${
            scrolled ? 'text-foreground' : 'text-white'
          }`}
        >
          谢亮亮<span className="text-accent">·</span>作品集
        </a>

        <div
          className={`flex items-center gap-8 text-[13px] transition-colors duration-500 ${
            scrolled ? 'text-muted' : 'text-white/60'
          }`}
        >
          <a
            href="#works"
            className={`hover:text-white transition-colors tracking-wide ${
              scrolled ? 'hover:text-foreground' : ''
            }`}
          >
            作品
          </a>
          <a
            href="#about"
            className={`hover:text-white transition-colors tracking-wide ${
              scrolled ? 'hover:text-foreground' : ''
            }`}
          >
            关于
          </a>
          <a
            href="#contact"
            className="px-5 py-2 rounded-lg bg-accent text-white text-[13px] hover:bg-accent-soft transition-all shadow-lg shadow-accent/20"
          >
            联系我
          </a>
        </div>
      </nav>
    </header>
  );
}
