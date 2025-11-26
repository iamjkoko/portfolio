import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // or next/navigation for Next.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);
  const location = useLocation(); // Track route changes

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 1024;

    // Mobile: Simple scroll-to-top on route change
    if (isMobile) {
      const hash = window.location.hash;
      
      if (hash) {
        // Hash navigation - scroll to element
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'auto' });
          }, 100);
        }
      } else {
        // No hash - scroll to top
        window.scrollTo(0, 0);
      }
      
      return;
    }

    // Desktop: Full smooth scroll implementation
    let currentScroll = 0;
    let targetScroll = 0;
    let rafId = null;

    gsap.set(container, { 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%",
      willChange: "transform"
    });

    const updateHeight = () => {
      requestAnimationFrame(() => {
        const height = container.scrollHeight;
        document.body.style.height = `${height}px`;
        ScrollTrigger.refresh();
      });
    };

    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const scrollPosition = element.offsetTop;
          currentScroll = scrollPosition;
          targetScroll = scrollPosition;
          window.scrollTo(0, scrollPosition);
          container.style.transform = `translate3d(0, ${-scrollPosition}px, 0)`;
        }
      } else {
        // Reset scroll position on route change
        currentScroll = 0;
        targetScroll = 0;
        window.scrollTo(0, 0);
        container.style.transform = `translate3d(0, 0, 0)`;
      }
    };

    const initialUpdate = setTimeout(updateHeight, 100);
    setTimeout(handleInitialHash, 150);

    const animate = () => {
      targetScroll = window.scrollY;
      currentScroll += (targetScroll - currentScroll) * 0.1;
      
      if (Math.abs(targetScroll - currentScroll) > 0.1) {
        container.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;
      }
      
      rafId = requestAnimationFrame(animate);
    };

    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
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
    });

    const observer = new MutationObserver(() => {
      updateHeight();
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateHeight, 100);
    };
    window.addEventListener("resize", handleResize);
    
    animate();

    return () => {
      clearTimeout(initialUpdate);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      gsap.set(container, { clearProps: "all" });
      document.body.style.height = "";
      ScrollTrigger.refresh();
    };
  }, [location]); // Re-run on route change (includes both children and location)

  return <div ref={containerRef}>{children}</div>;
}