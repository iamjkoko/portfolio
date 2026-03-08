//Unused component

import React, { useState } from 'react';

interface UnderlineProps {
  text: string;
  className?: string;
  underlineColor?: string;
  underlineHeight?: number;
  animationDuration?: number;
  isHovered?: boolean; // Optional prop to control hover state externally
}

const Underline: React.FC<UnderlineProps> = ({
  text,
  className = '',
  underlineColor = '#000000',
  underlineHeight = 3,
  animationDuration = 400,
  isHovered: externalIsHovered,
}) => {
  const [internalIsHovered, setInternalIsHovered] = useState(false);
  
  // Use external hover state if provided, otherwise use internal state
  const isHovered = externalIsHovered !== undefined ? externalIsHovered : internalIsHovered;

  return (
    <span 
      className={`inline-block cursor-pointer ${className}`}
      onMouseEnter={() => externalIsHovered === undefined && setInternalIsHovered(true)}
      onMouseLeave={() => externalIsHovered === undefined && setInternalIsHovered(false)}
    >
      <span style={{ position: 'relative', display: 'inline-block', paddingBottom: '12px' }}>
        {text.split(' ').map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            {word.split('').map((char, i) => {
              const hasDescender = /[gjpqyQ]/.test(char);
              return (
                <span
                  key={i}
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  {char}
                  {!hasDescender && (
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        right: '0',
                        bottom: '0em',
                        height: `${underlineHeight}px`,
                        backgroundColor: underlineColor,
                        transformOrigin: 'left',
                        transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                        transitionProperty: 'transform',
                        transitionDuration: `${animationDuration}ms`,
                        transitionTimingFunction: 'ease-out',
                        transitionDelay: `${i * 30}ms`,
                        boxShadow: `0 0 10px ${underlineColor}40`,
                      }}
                    />
                  )}
                </span>
              );
            })}
            {wordIndex < text.split(' ').length - 1 && ' '}
          </React.Fragment>
        ))}
      </span>
    </span>
  );
};

export default Underline;

// Example usage:
// <Underline 
//   text="Typography matters" 
//   className="text-5xl font-semibold text-white"
//   underlineColor="#22d3ee"
//   underlineHeight={3}
//   animationDuration={400}
// />