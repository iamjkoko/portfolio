import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);
  const isDisabledRef = useRef(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // Keep ref in sync with state
  useEffect(() => {
    isDisabledRef.current = isDisabled;
  }, [isDisabled]);

  // Listen for intro state changes
  useEffect(() => {
    const handleIntroState = (e) => setIsDisabled(e.detail.showIntro);
    window.addEventListener("introStateChange", handleIntroState);
    return () => window.removeEventListener("introStateChange", handleIntroState);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect mobile devices (use matchMedia for cleaner logic)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return; // Skip smooth scroll on mobile

    // Fix container for smooth scrolling
    gsap.set(container, { position: "fixed", top: 0, left: 0, width: "100%" });

    // Sync body height to enable scrollbar
    let resizeTimeout;
    const setBodyHeight = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        document.body.style.height = `${container.scrollHeight}px`;
      }, 50);
    };
    setBodyHeight();
    const resizeObserver = new ResizeObserver(setBodyHeight);
    resizeObserver.observe(container);

    let scrollY = 0;
    let targetScrollY = 0;

    // Smooth scroll loop (using GSAP ticker for better sync)
    const updateScroll = () => {
      if (!isDisabledRef.current) {
        scrollY += (targetScrollY - scrollY) * 0.05; // inertia
        scrollY = Math.max(0, Math.min(scrollY, container.scrollHeight - window.innerHeight));
        gsap.set(container, { y: -scrollY });
      }
      ScrollTrigger.update(); // keep triggers synced
    };
    gsap.ticker.add(updateScroll);

    // Handle real scroll events
    const handleScroll = () => {
      if (!isDisabledRef.current) {
        targetScrollY = window.scrollY;
      } else {
        window.scrollTo(0, scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ScrollTrigger proxy integration
    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (value !== undefined && !isDisabledRef.current) targetScrollY = value;
        return scrollY;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    });

    ScrollTrigger.addEventListener("refresh", setBodyHeight);
    ScrollTrigger.refresh();

    // Smooth anchor navigation
    const handleAnchorClick = (e) => {
      if (isDisabledRef.current) return;
      const link = e.target.closest("a[href^='#']");
      if (!link) return;

      e.preventDefault();
      const targetEl = document.querySelector(link.getAttribute("href"));
      if (targetEl) {
        const y = targetEl.getBoundingClientRect().top + window.scrollY;
        targetScrollY = y;
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Custom "scrollToTop" event
    const handleScrollToTop = () => {
      if (!isDisabledRef.current) targetScrollY = 0;
    };
    window.addEventListener("scrollToTop", handleScrollToTop);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollToTop", handleScrollToTop);
      document.removeEventListener("click", handleAnchorClick);
      ScrollTrigger.removeEventListener("refresh", setBodyHeight);
      gsap.ticker.remove(updateScroll);
    };
  }, []); // only run once

  return (
    <div ref={containerRef} data-smooth-scroll>
      {children}
    </div>
  );
}
