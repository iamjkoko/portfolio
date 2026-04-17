import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';

const PROJECT_INFO_TARGETS_SELECTOR =
  'h1, h2, h3, p, [class*="project-keywords"] span, .project-keywords span';

export default function useProjectInfoStagger(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const projectInfoEl = ref.current;
    if (!projectInfoEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const fadeTargets = projectInfoEl.querySelectorAll(PROJECT_INFO_TARGETS_SELECTOR);
    if (!fadeTargets.length) return;

    const context = gsap.context(() => {
      gsap.set(fadeTargets, { opacity: 0, y: 20 });
      gsap.to(fadeTargets, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.12,
        clearProps: 'opacity,transform'
      });
    }, projectInfoEl);

    return () => context.revert();
  }, [ref]);
}
