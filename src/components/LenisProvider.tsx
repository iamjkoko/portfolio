import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ROUTE_EXIT_COMPLETE_EVENT } from "../constants/events";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook are intentionally colocated
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

    window.addEventListener(ROUTE_EXIT_COMPLETE_EVENT, handleExitComplete);
    return () => {
      window.removeEventListener(ROUTE_EXIT_COMPLETE_EVENT, handleExitComplete);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
