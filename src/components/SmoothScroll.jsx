import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);
  const rafIdRef = useRef(null);

  // Listen for intro state changes
  useEffect(() => {
    const handleIntroState = (e) => {
      setIsDisabled(e.detail.showIntro);
    };
    
    window.addEventListener('introStateChange', handleIntroState);
    return () => window.removeEventListener('introStateChange', handleIntroState);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect mobile devices
    const isMobile =
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) return;

    // Setup container for smooth scrolling
    gsap.set(container, { 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%",
      overflow: "visible" // Allow children to overflow for sticky positioning
    });

    // Sync body height with container
    const setBodyHeight = () => {
      document.body.style.height = `${container.scrollHeight}px`;
    };
    setBodyHeight();

    // Watch for container size changes
    const resizeObserver = new ResizeObserver(() => {
      setBodyHeight();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(container);

    // Smooth scroll animation loop
    const updateScroll = () => {
      if (!isDisabled) {
        const ease = 0.08; // Adjust for smoothness (0.05-0.15 recommended)
        scrollYRef.current += (targetScrollYRef.current - scrollYRef.current) * ease;
        
        const maxScroll = container.scrollHeight - window.innerHeight;
        scrollYRef.current = Math.max(0, Math.min(scrollYRef.current, maxScroll));

        gsap.set(container, { y: -scrollYRef.current });
      }
      
      rafIdRef.current = requestAnimationFrame(updateScroll);
    };

    // Handle native scroll events
    const handleScroll = () => {
      if (!isDisabled) {
        targetScrollYRef.current = window.scrollY;
      } else {
        // Keep scroll position locked when disabled
        window.scrollTo(0, scrollYRef.current);
      }
    };

    // ScrollTrigger configuration for proper integration
    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (value !== undefined && !isDisabled) {
          targetScrollYRef.current = value;
          scrollYRef.current = value; // Instant update for ScrollTrigger
        }
        return scrollYRef.current;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      pinType: "transform" // Critical for sticky/pin to work
    });

    // Smooth anchor navigation
    const handleAnchorClick = (e) => {
      if (isDisabled) return;
      
      const link = e.target.closest("a[href^='#']");
      if (!link) return;

      e.preventDefault();
      const href = link.getAttribute("href");
      const targetEl = document.querySelector(href);
      
      if (targetEl) {
        // Calculate target position relative to the container
        const rect = targetEl.getBoundingClientRect();
        const y = rect.top + scrollYRef.current;
        
        targetScrollYRef.current = y;
        window.scrollTo(0, y);
      }
    };

    // Custom scroll to top event
    const handleScrollToTop = () => {
      if (!isDisabled) {
        targetScrollYRef.current = 0;
        window.scrollTo(0, 0);
      }
    };

    // Start animation loop
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("scrollToTop", handleScrollToTop);
    ScrollTrigger.addEventListener("refresh", setBodyHeight);
    
    updateScroll();
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("scrollToTop", handleScrollToTop);
      ScrollTrigger.removeEventListener("refresh", setBodyHeight);
      resizeObserver.disconnect();
      
      // Reset styles
      gsap.set(container, { clearProps: "all" });
      document.body.style.height = "";
    };
  }, [isDisabled]);

  return (
    <div ref={containerRef} data-smooth-scroll>
      {children}
    </div>
  );
}