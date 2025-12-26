import { useEffect, useRef, useState, createContext, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define types for the context value
interface ScrollContextValue {
  isScrollReady: boolean;
}

// Create and Export the Context
export const ScrollContext = createContext<ScrollContextValue>({ isScrollReady: false });

// Define props interface
interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const prevPathnameRef = useRef<string>(location.pathname);
  
  // Add a state to track readiness
  const [isScrollReady, setScrollReady] = useState<boolean>(false);

  // Handle route changes
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    if (prevPathnameRef.current !== location.pathname && !location.hash) {
      const scrollTimer = setTimeout(() => {
        const scrollToTop = (): void => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        };
        
        scrollToTop();
        
        requestAnimationFrame(() => {
          scrollToTop();
        });
      }, isMobile ? 300 : 0); // Mobile: hide in fade; Desktop: scroll immediately
      
      prevPathnameRef.current = location.pathname;
      
      return () => clearTimeout(scrollTimer);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
      const handleInitialHashMobile = (): void => {
        const hash = window.location.hash;
        if (hash) {
          const element = document.querySelector(hash);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'auto' });
            }, 100);
          }
        }
      };

      handleInitialHashMobile();
      
      // Mark as ready immediately for mobile
      setScrollReady(true);
      return;
    }

    // Desktop: Full smooth scroll implementation
    let currentScroll = 0;
    let targetScroll = 0;
    let rafId: number | null = null;

    gsap.set(container, { 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%",
      willChange: "transform"
    });

    const updateHeight = (): void => {
      requestAnimationFrame(() => {
        const height = container.scrollHeight;
        document.body.style.height = `${height}px`;
        ScrollTrigger.refresh();
      });
    };

    const handleInitialHash = (): void => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash) as HTMLElement | null;
        if (element) {
          const scrollPosition = element.offsetTop;
          currentScroll = scrollPosition;
          targetScroll = scrollPosition;
          window.scrollTo(0, scrollPosition);
          container.style.transform = `translate3d(0, ${-scrollPosition}px, 0)`;
        }
      }
    };

    const initialUpdate = setTimeout(updateHeight, 100);
    setTimeout(handleInitialHash, 150);

    const animate = (): void => {
      targetScroll = window.scrollY;
      currentScroll += (targetScroll - currentScroll) * 0.1;
      
      if (Math.abs(targetScroll - currentScroll) > 0.1) {
        container.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;
      }
      
      rafId = requestAnimationFrame(animate);
    };

    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          currentScroll = targetScroll = value;
        }
        return currentScroll;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      // Tell ScrollTrigger the content is fixed
      pinType: container.style.transform ? "transform" : "fixed"
    });

    const observer = new MutationObserver(() => {
      updateHeight();
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = (): void => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateHeight, 100);
    };
    window.addEventListener("resize", handleResize);
    
    animate();

    // Mark as ready AFTER proxy is set
    setScrollReady(true);

    return () => {
      clearTimeout(initialUpdate);
      clearTimeout(resizeTimeout);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      gsap.set(container, { clearProps: "all" });
      document.body.style.height = "";
      ScrollTrigger.refresh();
      
      // Reset on unmount
      setScrollReady(false);
    };
  }, [children]);

  return (
    <ScrollContext.Provider value={{ isScrollReady }}>
      <div ref={containerRef} id="snap-main-container">
        {children}
      </div>
    </ScrollContext.Provider>
  );
}

