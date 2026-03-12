import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis once
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.15 })
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll position after exit animation completes
  useEffect(() => {
    const handleExitComplete = () => {
      const lenis = lenisRef.current;
      if (!lenis) return;

      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };

    window.addEventListener("route-exit-complete", handleExitComplete);
    return () => {
      window.removeEventListener("route-exit-complete", handleExitComplete);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
