'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/career-gps', label: 'Career GPS', icon: '🗺️' },
  { href: '/dashboard/roadmap', label: 'Roadmaps', icon: '🛣️' },
  { href: '/dashboard/simulator', label: 'Work Simulator', icon: '💼' },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: '🎯' },
  { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 hover:bg-gray-100 rounded-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen bg-card border-r border-border w-64 transition-transform duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-border">
          <Link href="/dashboard" className="text-2xl font-bold text-primary font-sans">
            PathForge
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Career Transformation</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive(item.href) ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 h-10 ${
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/50">
          <Button variant="outline" className="w-full justify-start gap-3 h-10">
            <span className="text-lg">🚪</span>
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>

      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
        />
      )}
    </>
  );
}
