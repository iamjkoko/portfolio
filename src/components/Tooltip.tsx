import React, { useState, useRef } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Tooltip = ({ children, content }: TooltipProps) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setMounted(true);
    timeoutRef.current = window.setTimeout(() => setVisible(true), 30);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setVisible(false);
    timeoutRef.current = window.setTimeout(() => setMounted(false), 200);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.pageX + 15, y: e.pageY + 15 });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ display: 'contents' }}
    >
      {children}

      {mounted && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-200 ease-out hidden md:block"
          style={{ left: position.x, top: position.y, opacity: visible ? 1 : 0 }}
        >
          <div className="bg-black/20 backdrop-blur-md border border-white/10 text-white text-sm px-3 py-2 rounded-[30px] shadow-lg whitespace-nowrap">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;