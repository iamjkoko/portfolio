import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StaggeredText = ({ text, className = "" }) => {
  const [isMobile, setIsMobile] = useState(false);
  const words = text.split(" ");

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 935);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Delay between each word
        delayChildren: 0, // Initial delay before first word
      }
    }
  };

  const child = {
    hidden: {
      y: 100,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: { duration: 0.5, ease: [0.3, 0.05, 0.01, 0.9] },
        opacity: { duration: 0.3 }
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '0.15em' : '0.3em' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default StaggeredText;