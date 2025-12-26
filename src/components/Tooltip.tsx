import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Tooltip = ({ children, content }: TooltipProps) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Set position immediately on enter to prevent stale position on remount
    setPosition({ x: e.clientX + 15, y: e.clientY + 15 });
    setMounted(true);
    timeoutRef.current = window.setTimeout(() => setVisible(true), 30);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setVisible(false);
    timeoutRef.current = window.setTimeout(() => setMounted(false), 200);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Use clientX/clientY since we're portaling to document.body
    setPosition({ x: e.clientX + 15, y: e.clientY + 15 });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ display: 'contents' }}
    >
      {children}

      {mounted && createPortal(
        <div
          className="fixed pointer-events-none z-50 hidden md:block"
          style={{ left: position.x, top: position.y }}
        >
          <div 
            className="border border-white/10 text-white text-sm px-3 py-2 rounded-[30px] shadow-lg whitespace-nowrap transition-all duration-200 ease-out"
            style={{ 
              opacity: visible ? 1 : 0,
              backgroundColor: visible ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0)',
              backdropFilter: visible ? 'blur(12px)' : 'blur(0px)',
              WebkitBackdropFilter: visible ? 'blur(12px)' : 'blur(0px)',
            }}
          >
            {content}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Tooltip;