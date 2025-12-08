import React, { useState, useEffect } from "react";
import { CornerDownRight } from "lucide-react";

import InstagramIconBlack from '../assets/icons/instagram-black.webp';
import LinkedinIconBlack from '../assets/icons/linkedin-black.webp';
import InstagramIconWhite from '../assets/icons/instagram-white.webp';
import LinkedinIconWhite from '../assets/icons/linkedin-white.webp';

const Footer = ({ theme }) => {
  const isDark = theme === 'dark';
  const themeClasses = isDark 
    ? 'bg-[#111111] text-[rgb(192, 192, 192)]'
    : 'bg-[#f0f0f0] text-[rgb(170,170,170)]';
  
  const InstagramIcon = isDark ? InstagramIconWhite : InstagramIconBlack;
  const LinkedinIcon = isDark ? LinkedinIconWhite : LinkedinIconBlack;

  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setLocalTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={`w-full relative z-[1] p-8 max-[935px]:p-5 border-none ${themeClasses}`}>
      <div className="max-w-[1400px] mx-auto mb-12 md:pl-0">
        <h2 
          className={`text-[80px] md:text-[80px] lg:text-[150px] leading-none font-bold tracking-tight ${
            isDark ? 'text-white/20' : 'text-black/10'
          }`}
          style={{ fontFamily: 'Boska, serif' }}
        >
        Let's connect.
        </h2>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 pl-4 md:pl-0">
        
        {/* Contact Section */}
        <div className="space-y-3">
          <h3 className="text-base font-medium mb-3 opacity-60 max-[935px]:pt-4">Get in Touch</h3>
          <a 
            href="mailto:eko03@risd.edu" 
            className={`flex items-center gap-2 text-sm`}
          >
            <span className="opacity-60">
            <CornerDownRight size={16} />
            </span>
            <span className="transition-opacity font-medium opacity-60 hover:opacity-100">
            eko03@risd.edu
            </span>
          </a>
          {/*
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Available for work</span>
          </div>
          */}
        </div>

        {/* Social Links Section */}
        <div className="space-y-3">
          <h3 className="text-base font-medium mb-3 opacity-60">Links</h3>
          <div className="flex items-center gap-2">
            <span className="opacity-50">
            <CornerDownRight size={16} />
            </span>
            <div className="flex gap-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-opacity opacity-40 hover:opacity-70`}
                aria-label="LinkedIn"
              >
                <img src={LinkedinIcon} alt="LinkedIn" className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-opacity opacity-40 hover:opacity-70`}
                aria-label="Instagram"
              >
                <img src={InstagramIcon} alt="Instagram" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-3">
          <p className="text-xs opacity-60 pt-0.5">
            Local time: {localTime}
          </p>
          <p className="text-xs opacity-60 pt-0.5">
            Last updated: December 2025
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto pt-60">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-40">
          <p>© 2025 Eric Ko. All rights reserved.</p>
          <p>Designed & Built with React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;