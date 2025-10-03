import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect mobile devices
    const isMobile =
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) return; // Skip smooth scroll on mobile

    // Fix container for smooth scrolling
    gsap.set(container, { position: "fixed", top: 0, left: 0, width: "100%" });

    // Keep body height in sync with container
    const setBodyHeight = () => {
      document.body.style.height = `${container.scrollHeight}px`;
    };
    setBodyHeight();

    const resizeObserver = new ResizeObserver(setBodyHeight);
    resizeObserver.observe(container);

    let scrollY = 0;
    let targetScrollY = 0;

    const updateScroll = () => {
      scrollY += (targetScrollY - scrollY) * 0.05; // inertia
      const maxScroll = container.scrollHeight - window.innerHeight;
      scrollY = Math.max(0, Math.min(scrollY, maxScroll));

      gsap.set(container, { y: -scrollY });
      requestAnimationFrame(updateScroll);
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    updateScroll();

    // ScrollTrigger integration
    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (value !== undefined) targetScrollY = value;
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
      const link = e.target.closest("a[href^='#']");
      if (!link) return;

      e.preventDefault();
      const targetEl = document.querySelector(link.getAttribute("href"));
      if (targetEl) {
        const y = targetEl.getBoundingClientRect().top + window.scrollY;
        targetScrollY = y;
        window.scrollTo(0, y); // sync native scroll
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Custom "scrollToTop" event
    const handleScrollToTop = () => {
      targetScrollY = 0;
    };
    window.addEventListener("scrollToTop", handleScrollToTop);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      ScrollTrigger.removeEventListener("refresh", setBodyHeight);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("scrollToTop", handleScrollToTop);
    };
  }, []);

  return (
    <div ref={containerRef} data-smooth-scroll>
      {children}
    </div>
  );
}
