import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);
  const rafIdRef = useRef(null);
  const lastScrollTime = useRef(0);
  const resizeTimeoutRef = useRef(null);
  const resizeObserverRef = useRef(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

    // Disable smooth scroll on mobile for better performance
    if (isMobile) {
      gsap.set(container, { clearProps: "all" });
      document.body.style.height = "";
      return;
    }

    // Setup container for smooth scrolling (desktop only)
    gsap.set(container, { 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%",
      overflow: "visible",
      willChange: "transform"
    });

    // Sync body height with container
    const setBodyHeight = () => {
      const height = container.scrollHeight;
      document.body.style.height = `${height}px`;
    };
    setBodyHeight();

    // Debounced resize observer
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        setBodyHeight();
        ScrollTrigger.refresh();
      }, 150);
    });
    resizeObserverRef.current = resizeObserver;
    resizeObserver.observe(container);

    // Optimized smooth scroll animation loop
    const updateScroll = () => {
      if (!isDisabled) {
        const now = performance.now();
        const deltaTime = now - lastScrollTime.current;
        
        // Throttle updates to ~60fps max
        if (deltaTime >= 16) {
          const ease = 0.08;
          const diff = targetScrollYRef.current - scrollYRef.current;
          
          // Only update if difference is significant
          if (Math.abs(diff) > 0.5) {
            scrollYRef.current += diff * ease;
            
            const maxScroll = container.scrollHeight - window.innerHeight;
            scrollYRef.current = Math.max(0, Math.min(scrollYRef.current, maxScroll));

            container.style.transform = `translate3d(0, ${-scrollYRef.current}px, 0)`;
          }
          
          lastScrollTime.current = now;
        }
      }
      
      rafIdRef.current = requestAnimationFrame(updateScroll);
    };

    // Handle native scroll events with passive listener
    const handleScroll = () => {
      if (!isDisabled) {
        targetScrollYRef.current = window.scrollY;
      } else {
        window.scrollTo(0, scrollYRef.current);
      }
    };

    // ScrollTrigger configuration
    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (value !== undefined && !isDisabled) {
          targetScrollYRef.current = value;
          scrollYRef.current = value;
        }
        return scrollYRef.current;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      pinType: "transform"
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
    
    lastScrollTime.current = performance.now();
    updateScroll();
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("scrollToTop", handleScrollToTop);
      ScrollTrigger.removeEventListener("refresh", setBodyHeight);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      
      // Reset styles
      gsap.set(container, { clearProps: "all" });
      document.body.style.height = "";
    };
  }, [isDisabled, isMobile]);

  return (
    <div ref={containerRef} data-smooth-scroll>
      {children}
    </div>
  );
}