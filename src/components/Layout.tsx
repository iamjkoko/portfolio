import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { INTRO_SEEN_STORAGE_KEY } from "../constants/homeIntro";
import { INTRO_COMPLETE_EVENT } from "../constants/events";

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

    window.addEventListener(INTRO_COMPLETE_EVENT, handleIntroComplete);

    const currentPath = location.pathname;
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
      window.removeEventListener(INTRO_COMPLETE_EVENT, handleIntroComplete);
    };
  }, [location]);


  return (
    <>
      <Navbar showNavbar={showNavbar} />
      <main>{children}</main>
    </>
  );
}
