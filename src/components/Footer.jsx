import React from "react";

const Footer = ({ theme }) => {
  const themeClasses = theme === 'dark' 
    ? 'bg-black text-[rgb(118,118,118)]'
    : 'bg-[#f0f0f0] text-[rgb(170,170,170)]';
  
  return (
    <footer className={`flex justify-between items-center p-5 text-sm max-[935px]:text-[0.625rem] w-full relative z-[1] m-0 border-none ${themeClasses}`}>
      <p className="font-normal flex-1 text-center">eko03@risd.edu © 2025 Eric Ko</p>
    </footer>
  );
};

export default Footer;