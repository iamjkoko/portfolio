import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { INTRO_SEEN_STORAGE_KEY } from "../constants/homeIntro";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
      setShowNavbar(true);
    } else {
      // Home: child (Home) useEffects run before this parent effect, so
      // introComplete may already have fired while showNavbar was still false.
      try {
        if (sessionStorage.getItem(INTRO_SEEN_STORAGE_KEY) === "1") {
          setShowNavbar(true);
        }
      } catch {
        /* ignore */
      }
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
