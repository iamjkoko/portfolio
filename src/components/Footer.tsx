import { useState, useEffect } from "react";
import { CornerDownRight } from "lucide-react";

import { EXTERNAL_LINKS } from '../constants/routes';
import InstagramIconBlack from '../assets/icons/instagram-black.webp';
import LinkedinIconBlack from '../assets/icons/linkedin-black.webp';
import ArenaIconBlack from '../assets/icons/are.na-black.webp';
import InstagramIconWhite from '../assets/icons/instagram-white.webp';
import LinkedinIconWhite from '../assets/icons/linkedin-white.webp';
import ArenaIconWhite from '../assets/icons/are.na-white.webp';

interface FooterProps {
  theme?: 'dark' | 'light';
}

const Footer = ({ theme }: FooterProps) => {
  const isDark = theme === 'dark';
  const themeClasses = isDark
    ? 'bg-[#111111] text-[#e5e5e5]'
    : 'bg-[#f0f0f0] text-[#808080]';

  const InstagramIcon = isDark ? InstagramIconWhite : InstagramIconBlack;
  const LinkedinIcon = isDark ? LinkedinIconWhite : LinkedinIconBlack;
  const ArenaIcon = isDark ? ArenaIconWhite : ArenaIconBlack;
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
    <footer className={`w-full relative z-[1] p-8 max-mobile:py-5 max-mobile:px-[var(--page-padding-x-mobile)] border-none ${themeClasses}`}>
      {/*}
      <div className="max-w-[1400px] mx-auto mb-12 md:pl-0">
        <h2
          className={`text-[80px] md:text-[80px] lg:text-[150px] leading-none font-bold tracking-tight ${
            isDark ? 'text-white/20' : 'text-black/10'
          }`}
          style={{ fontFamily: 'Boska, serif' }}
        >
        Eric Ko
        </h2>
      </div>
      */}

      {/* Main Footer Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">

        {/* Contact Section */}
        <div className="space-y-3">
          <h3 className="text-base opacity-50 font-semibold mb-3 max-mobile:pt-4">Get in Touch</h3>
          <a
            href="mailto:eko03@risd.edu"
            className={`flex items-center gap-2 text-sm`}
          >
            <span className="opacity-50">
            <CornerDownRight size={16} />
            </span>
            <span className="transition-opacity font-medium opacity-50 hover:opacity-100">
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
          <h3 className="text-base opacity-50 font-semibold mb-3">Links</h3>
          <div className="flex items-center gap-2">
            <span className="opacity-50">
            <CornerDownRight size={16} />
            </span>
            <div className="flex gap-2">
              <a
                href={EXTERNAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-opacity opacity-35 hover:opacity-100`}
                aria-label="LinkedIn"
              >
                <img src={LinkedinIcon} alt="LinkedIn" className="w-6 h-6" />
              </a>
              <a
                href={EXTERNAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-opacity opacity-35 hover:opacity-100`}
                aria-label="Instagram"
              >
                <img src={InstagramIcon} alt="Instagram" className="w-6 h-6" />
              </a>
              <a
                href={EXTERNAL_LINKS.ARENA}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-opacity opacity-35 hover:opacity-100`}
                aria-label="Arena"
              >
                <img src={ArenaIcon} alt="Arena" className="w-10 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-3">
          <p className="text-xs opacity-80 pt-0.5">
            Local time: {localTime}
          </p>
          <p className="text-xs opacity-80 pt-0.5">
            Last updated: {__BUILD_DATE__}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto pt-60">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-80">
          <p>© 2026 Eric Ko. All rights reserved.</p>
          <p>Designed & Built with React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
