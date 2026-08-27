import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from './LenisProvider';

type LoadingScreenProps = {
  isVisible: boolean;
};

const FADE_MS = 700;

const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
]);

/*
 * Rendered via portal: the page-transition wrapper (AnimatedPage) applies a
 * CSS filter, which turns `position: fixed` descendants into being positioned
 * relative to it instead of the viewport, pushing the centered content
 * off-screen.
 */
const LoadingScreen = ({ isVisible }: LoadingScreenProps) => {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  // Keep the lock through the fade-out so a scroll during the transition
  // cannot leave the landing already scrolled.
  const [isLocking, setIsLocking] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setIsLocking(true);
      return;
    }
    const id = window.setTimeout(() => setIsLocking(false), FADE_MS);
    return () => window.clearTimeout(id);
  }, [isVisible]);

  useEffect(() => {
    if (!isLocking) return;

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };
    const preventScrollKeys = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.has(event.key)) event.preventDefault();
    };

    document.documentElement.classList.add('lenis-stopped');
    lenisRef.current?.stop();

    window.addEventListener('wheel', preventScroll, { passive: false, capture: true });
    window.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
    window.addEventListener('keydown', preventScrollKeys, { capture: true });

    return () => {
      window.removeEventListener('wheel', preventScroll, { capture: true });
      window.removeEventListener('touchmove', preventScroll, { capture: true });
      window.removeEventListener('keydown', preventScrollKeys, { capture: true });
      const instance = lenisRef.current;
      instance?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      instance?.start();
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [isLocking]);

  // Lenis mounts after first paint; stop it if it appears while still locking.
  useEffect(() => {
    if (!isLocking || !lenis) return;
    lenis.stop();
  }, [isLocking, lenis]);

  return createPortal(
    <div
      className={`fixed inset-0 bg-black z-[10090] flex items-center justify-center transition-opacity duration-700 ease-out ${
        isLocking ? 'pointer-events-auto touch-none' : 'pointer-events-none'
      }`}
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden={!isVisible}
      data-lenis-prevent
    >
      <span className="loading-dot" />
    </div>,
    document.body
  );
};

export default LoadingScreen;
