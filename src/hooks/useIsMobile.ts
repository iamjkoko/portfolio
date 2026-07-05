import { useEffect, useState } from 'react';

/**
 * Single source of truth for the mobile breakpoint.
 * Keep in sync with `--breakpoint-mobile` in global.css (936px), which powers
 * the `mobile:` (>= 936px) and `max-mobile:` (<= 935px) Tailwind variants.
 */
export const MOBILE_MAX_WIDTH_PX = 935;

export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_MAX_WIDTH_PX}px)`;

/** True when the viewport is at or below the mobile breakpoint. */
export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_MEDIA_QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MEDIA_QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}
