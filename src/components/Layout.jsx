import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  // Navbar visibility logic
  useEffect(() => {
    const handleIntroComplete = () => {
      setShowNavbar(true);
    };

    window.addEventListener('introComplete', handleIntroComplete);
    
    const currentPath = window.location.pathname;
    if (currentPath !== '/' && currentPath !== '') {
      // For non-home pages, show navbar immediately
      setShowNavbar(true);
    } else {
      // For home page, always wait for introComplete event
      // This ensures the delay is respected even for returning visitors
    }
    
    return () => {
      window.removeEventListener('introComplete', handleIntroComplete);
    };
  }, [location]);


  return (
    <>
      <Navbar showNavbar={showNavbar} />
      <main>{children}</main>
    </>
  );
}