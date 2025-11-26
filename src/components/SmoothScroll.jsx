import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mobile check - disable smooth scroll animation on mobile
    const isMobile = window.innerWidth < 1024;

    // Handle hash navigation for mobile (without smooth scroll)
    if (isMobile) {
      const handleInitialHashMobile = () => {
        const hash = window.location.hash;
        if (hash) {
          const element = document.querySelector(hash);
          if (element) {
            // Use native scrolling on mobile
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'auto' });
            }, 100);
          }
        }
      };

      handleInitialHashMobile();
      
      // No cleanup needed for mobile
      return;
    }

    // Desktop: Full smooth scroll implementation
    let currentScroll = 0;
    let targetScroll = 0;
    let rafId = null;

    // Setup
    gsap.set(container, { 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%",
      willChange: "transform"
    });

    const updateHeight = () => {
      // Use requestAnimationFrame to ensure accurate height after render
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
      }
    };

    // Initial height update with delay to ensure content is rendered
    const initialUpdate = setTimeout(updateHeight, 100);
    setTimeout(handleInitialHash, 150);

    // Smooth scroll loop
    const animate = () => {
      targetScroll = window.scrollY;
      currentScroll += (targetScroll - currentScroll) * 0.1;
      
      if (Math.abs(targetScroll - currentScroll) > 0.1) {
        container.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;
      }
      
      rafId = requestAnimationFrame(animate);
    };

    // ScrollTrigger proxy
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

    // Watch for content changes with MutationObserver
    const observer = new MutationObserver(() => {
      updateHeight();
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Update height on resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateHeight, 100);
    };
    window.addEventListener("resize", handleResize);
    
    // Start
    animate();

    // Cleanup
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
  }, [children]); // Re-run when children change (route changes)

  return <div ref={containerRef}>{children}</div>;
}