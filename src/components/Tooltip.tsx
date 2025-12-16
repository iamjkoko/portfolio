import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Tooltip = ({ children, content }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setShouldRender(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 300);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', display: 'contents' }}
    >
      {children}
      
      {shouldRender && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-300 ease-in-out hidden md:block"
          style={{
            left: `${position.x + 15}px`,
            top: `${position.y + 15}px`,
            opacity: isVisible ? 1 : 0
          }}
        >
          <div className="bg-black/20 backdrop-blur-md border border-white/10 text-white text-sm px-3 py-2 rounded-[30px] shadow-lg max-w-xs whitespace-nowrap">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
