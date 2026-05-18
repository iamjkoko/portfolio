import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 935;

function getIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

/**
 * Returns `true` when the viewport is at or below the mobile breakpoint (935px),
 * matching the project's existing `max-[935px]` Tailwind queries and `Navbar` logic.
 * Initial value is computed synchronously so the first render already reflects the
 * correct device, avoiding a flash of the wrong asset.
 */
export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);

  useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
