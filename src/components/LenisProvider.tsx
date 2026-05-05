import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
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
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Clear any leftover stopped class from a previous HMR cycle in dev.
    document.documentElement.classList.remove("lenis-stopped");

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const instance = new Lenis({
      lerp: 0.15,
      autoResize: !isTouchDevice,
    });
    lenisRef.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const teardown = () => {
      gsap.ticker.remove(ticker);
      instance.destroy();
      document.documentElement.classList.remove("lenis-stopped");
      if (lenisRef.current === instance) {
        lenisRef.current = null;
        setLenis(null);
      }
    };

    // Tear down before Vite swaps the module so wheel listeners can't double up.
    if (import.meta.hot) {
      import.meta.hot.dispose(teardown);
    }

    return teardown;
  }, []);

  useEffect(() => {
    const handleExitComplete = () => {
      const l = lenisRef.current;
      if (!l) return;

      l.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };

    window.addEventListener("route-exit-complete", handleExitComplete);
    return () => {
      window.removeEventListener("route-exit-complete", handleExitComplete);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
