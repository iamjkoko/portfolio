import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Make container fixed so we can move it
    gsap.set(container, { position: "fixed", top: 0, left: 0, width: "100%" });

    // Sync body height with container
    const setHeight = () => {
      document.body.style.height = `${container.getBoundingClientRect().height}px`;
    };
    setHeight();

    // Watch for dynamic content changes
    const resizeObserver = new ResizeObserver(setHeight);
    resizeObserver.observe(container);

    let scrollY = 0;
    let targetScrollY = 0;

    const updateScroll = () => {
      scrollY += (targetScrollY - scrollY) * 0.05; // inertia
      const maxScroll = container.getBoundingClientRect().height - window.innerHeight;
      scrollY = Math.max(0, Math.min(scrollY, maxScroll));

      gsap.set(container, { y: -scrollY });
      requestAnimationFrame(updateScroll);
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("scroll", onScroll);
    updateScroll();

    // Tell ScrollTrigger to use this custom scroller
    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (arguments.length) targetScrollY = value;
        return scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });

    ScrollTrigger.addEventListener("refresh", setHeight);
    ScrollTrigger.refresh();

    // Handle anchor links (#about, etc.)
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a[href^='#']");
      if (target) {
        e.preventDefault();
        const id = target.getAttribute("href");
        const el = document.querySelector(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY;
          targetScrollY = y; // let inertia loop glide there
          window.scrollTo(0, y); // update native scroll position instantly
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      ScrollTrigger.removeEventListener("refresh", setHeight);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
