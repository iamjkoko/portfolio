import * as React from 'react';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  // Support both 'ease' and 'easing' props, with 'easing' taking precedence
  const easeValue = easing || ease || 'power2.out';
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // On mobile, SmoothScroll doesn't set up ScrollTrigger proxy, so use window instead
    const isMobile = window.innerWidth < 1024;
    let scrollerTarget: Element | string | Window | null = null;

    if (isMobile) {
      // On mobile, always use window as the scroller
      scrollerTarget = window;
    } else {
      // On desktop, use the container prop or snap-main-container
      scrollerTarget = container || document.getElementById('snap-main-container') || null;
      
      if (typeof scrollerTarget === 'string') {
        scrollerTarget = document.querySelector(scrollerTarget);
      }
    }

    const startPct = (1 - threshold) * 100;
    const getSeconds = (val: number) => (val > 10 ? val / 1000 : val);

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

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
};

export default FadeContent;
