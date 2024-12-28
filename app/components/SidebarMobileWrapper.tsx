'use client';
import { useState, useEffect, ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

interface SidebarMobileWrapperProps {
  children: ReactNode;
}

export function SidebarMobileWrapper({ children }: SidebarMobileWrapperProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden fixed z-30 top-16 ${isOpen ? 'left-[248px]' : 'left-4'} 
          p-2 rounded-full bg-gray-800 text-white shadow-lg transition-all duration-200`}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
          fixed md:static top-0 left-0 z-20
          h-screen w-64 
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          bg-gray-100 dark:bg-gray-900 
          border-r dark:border-gray-700 
          overflow-hidden
        `}
      >
        {children}
      </div>
    </>
  );
}