import * as React from 'react';
import { useRef, useLayoutEffect, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollContext } from './SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  blur?: boolean;
  duration?: number;
  ease?: string;
  easing?: string; // Alias for ease prop
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  container,
  blur = false,
  duration = 1000,
  ease,
  easing,
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const easeValue = easing || ease || 'power2.out';
  const ref = useRef<HTMLDivElement>(null);
  
  // Consume the Context
  // If the context is undefined (component used outside SmoothScroll), default to true to avoid breaking it.
  const context = useContext(ScrollContext);
  const isScrollReady = context ? context.isScrollReady : true;

  useLayoutEffect(() => {
    // ABORT if not ready
    // This pauses the animation logic until SmoothScroll finishes setup.
    if (!isScrollReady) return;

    const el = ref.current;
    if (!el) return;

    // Resolving the scroller
    // SmoothScroll uses transform-based scrolling with window.scrollY as the source of truth,
    // so ScrollTrigger should always use window as the scroller (not the fixed container).
    const getScroller = () => {
      // If container prop is explicitly provided, use it
      if (container) {
        return typeof container === 'string' ? document.querySelector(container) : container;
      }
      // Otherwise always use window since SmoothScroll transforms are based on window.scrollY
      return window;
    };

    const scrollerTarget = getScroller();
    const startPct = (1 - threshold) * 100;
    const getSeconds = (val: number) => (val > 10 ? val / 1000 : val);

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(el, {
        autoAlpha: initialOpacity,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
        willChange: 'opacity, filter, transform'
      });

      const tl = gsap.timeline({
        paused: true,
        delay: getSeconds(delay),
        onComplete: () => {
          if (onComplete) onComplete();
          if (disappearAfter > 0) {
            gsap.to(el, {
              autoAlpha: initialOpacity,
              filter: blur ? 'blur(10px)' : 'blur(0px)',
              delay: getSeconds(disappearAfter),
              duration: getSeconds(disappearDuration),
              ease: disappearEase,
              onComplete: () => onDisappearanceComplete?.()
            });
          }
        }
      });

      tl.to(el, {
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: getSeconds(duration),
        ease: easeValue
      });

      ScrollTrigger.create({
        trigger: el,
        scroller: scrollerTarget,
        start: `top ${startPct}%`,
        once: true,
        onEnter: () => tl.play(),
        invalidateOnRefresh: true // CRITICAL: Recalculate on resize/refresh
      });
    }, ref);

    return () => ctx.revert();

  }, [isScrollReady, container, delay, duration, threshold]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
};

export default FadeContent;
