import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES, EXTERNAL_LINKS } from '../constants/routes';
import InstagramIcon from '../assets/icons/instagram-black.webp';
import LinkedinIcon from '../assets/icons/linkedin-black.webp';
import ArenaIcon from '../assets/icons/are.na-black.webp';
import { useLenis } from './LenisProvider';

const LOGO_LIGHT = '/favicon-black.svg';
const LOGO_DARK = '/favicon-white.svg';

/** Regions that intersect the viewport use this attribute; Navbar is the only reader (chrome vs page `html.dark` / CSS vars). */
const DARK_SECTION_SELECTOR = '[data-navbar-theme="dark"]';

/** Fade when switching glass (dark) ↔ solid white (default). Tweak `durationMs`, `delayMs`, and `easing` here. */
const NAVBAR_THEME_TRANSITION = {
  durationMs: 400,
  delayMs: 0,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
} as const;

const linkBase =
  'no-underline text-base font-medium whitespace-nowrap py-2 px-2 transition-[color_0.3s_ease]';

const linkClassDefault = `${linkBase} text-black hover:text-[rgb(140,140,140)]`;
const linkClassDark = `${linkBase} text-white hover:text-white/70`;

interface NavbarProps {
  showNavbar?: boolean;
}

export default function Navbar({ showNavbar = true }: NavbarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  /** `'dark'` = light text/logo for contrast over dark hero regions; `'default'` = black links on light sections. */
  const [navbarTheme, setNavbarTheme] = useState<'default' | 'dark'>('default');

  const lenis = useLenis();
  const location = useLocation();
  const lastScrollY = useRef(0);
  /** Bumped after `route-exit-complete` so theme observer re-runs once the next page is in the DOM (AnimatePresence mode="wait" delays mount vs. pathname updates). */
  const [routeEnterGeneration, setRouteEnterGeneration] = useState(0);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 935);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) setScrollHidden(false);
  }, [isMobile]);

  useEffect(() => {
    setScrollHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    const onRouteEnter = () => {
      requestAnimationFrame(() => setRouteEnterGeneration((g) => g + 1));
    };
    window.addEventListener('route-exit-complete', onRouteEnter);
    return () => window.removeEventListener('route-exit-complete', onRouteEnter);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setNavbarTheme('default');
      return;
    }

    const nodes = document.querySelectorAll(DARK_SECTION_SELECTOR);
    if (nodes.length === 0) {
      setNavbarTheme('default');
      return;
    }

    const visibility = new Map<Element, boolean>();
    nodes.forEach((el) => visibility.set(el, false));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target, entry.isIntersecting);
        }
        const anyIntersecting = Array.from(visibility.values()).some(Boolean);
        setNavbarTheme(anyIntersecting ? 'dark' : 'default');
      },
      {
        root: null,
        rootMargin: '-80px 0px 0px 0px',
        threshold: [0, 0.05, 0.1]
      }
    );

    nodes.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname, isMobile, routeEnterGeneration]);

  useEffect(() => {
    if (!lenis || isMobile) return;

    lastScrollY.current = lenis.animatedScroll;

    const onScroll = () => {
      const y = lenis.animatedScroll;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      if (y < 48) {
        setScrollHidden(false);
        return;
      }
      if (delta > 1.5) setScrollHidden(true);
      else if (delta < -1.5) setScrollHidden(false);
    };

    return lenis.on('scroll', onScroll);
  }, [lenis, isMobile]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Mobile navbar — pill-shaped top bar that expands into an editorial fullscreen menu
  if (isMobile) {
    const mobileLinks: Array<{ label: string; to: string; index: string }> = [
      { label: 'Home', to: ROUTES.HOME, index: '01' },
      { label: 'About', to: ROUTES.ABOUT, index: '02' },
      { label: 'Works', to: ROUTES.WORKS.ROOT, index: '03' },
      { label: 'Archive', to: ROUTES.ARCHIVE.ROOT, index: '04' }
    ];

    return (
      <>
        {/* Pill top bar — mirrors desktop navbar aesthetic */}
        <motion.header
          className="fixed inset-x-4 top-4 z-[10062] overflow-hidden rounded-4xl border border-black/10 bg-[#ffffff] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: showNavbar ? 1 : 0, y: showNavbar ? 0 : -8 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          style={{ pointerEvents: showNavbar ? 'auto' : 'none' }}
        >
          <div className="flex h-[56px] items-center justify-between pl-4 pr-4">
            {/* Logo */}
            <Link
              to={ROUTES.HOME}
              onClick={closeMobileMenu}
              className="flex size-[44px] shrink-0 items-center justify-center"
              aria-label="Home"
            >
              <img src={LOGO_LIGHT} alt="" aria-hidden className="h-[30px] w-[30px]" />
            </Link>

            {/* Menu toggle */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="flex size-[44px] items-center justify-center rounded-full text-black transition-colors hover:bg-black/[0.04] active:bg-black/[0.06]"
            >
              <span className="relative flex h-[18px] w-[22px] items-center justify-center">
                <motion.span
                  className="absolute left-0 right-0 h-[1.5px] rounded-sm bg-black"
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 0 : -5
                  }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                />
                <motion.span
                  className="absolute left-0 right-0 h-[1.5px] rounded-sm bg-black"
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? 0 : 5
                  }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                />
              </span>
            </button>
          </div>
        </motion.header>

        {/* Fullscreen Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              className="fixed inset-0 z-[10060] bg-[#ffffff]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            >
              <nav className="flex h-full w-full flex-col px-[var(--page-padding-x-mobile)] pb-8 pt-[calc(6rem+env(safe-area-inset-top))]">
                {/* Primary nav list */}
                <ul className="flex flex-col">
                  {mobileLinks.map((item, i) => (
                    <motion.li
                      key={item.to}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{
                        delay: 0.12 + i * 0.06,
                        duration: 0.45,
                        ease: [0.32, 0.72, 0, 1]
                      }}
                    >
                      <Link
                        to={item.to}
                        onClick={closeMobileMenu}
                        className="group flex items-baseline gap-4 py-5 text-black no-underline"
                      >
                        <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-black/40">
                          {item.index}
                        </span>
                        <span
                          className="text-[3rem] leading-[0.95] tracking-[-0.01em] max-[360px]:text-[2.6rem]"
                          style={{
                            fontFamily: "var(--font-family-boska)",
                            fontVariationSettings: "'wght' 500"
                          }}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Footer row */}
                <motion.div
                  className="mt-auto flex items-end justify-end pt-10"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                >
                  <div className="flex items-center gap-5">
                    <a
                      href={EXTERNAL_LINKS.INSTAGRAM}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      aria-label="Instagram"
                    >
                      <img
                        src={InstagramIcon}
                        alt=""
                        aria-hidden
                        className="h-6 w-6 transition-opacity duration-300 ease-in-out hover:opacity-60"
                      />
                    </a>
                    <a
                      href={EXTERNAL_LINKS.LINKEDIN}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      aria-label="LinkedIn"
                    >
                      <img
                        src={LinkedinIcon}
                        alt=""
                        aria-hidden
                        className="h-6 w-6 transition-opacity duration-300 ease-in-out hover:opacity-60"
                      />
                    </a>
                    <a
                      href={EXTERNAL_LINKS.ARENA}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      aria-label="Are.na"
                    >
                      <img
                        src={ArenaIcon}
                        alt=""
                        aria-hidden
                        className="h-6 w-10 transition-opacity duration-300 ease-in-out hover:opacity-60"
                      />
                    </a>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  const linkClass = navbarTheme === 'dark' ? linkClassDark : linkClassDefault;

  const themeTransition = `${NAVBAR_THEME_TRANSITION.durationMs}ms ${NAVBAR_THEME_TRANSITION.easing} ${NAVBAR_THEME_TRANSITION.delayMs}ms`;
  const navbarThemeStyleTransition = [
    `background ${themeTransition}`,
    `backdrop-filter ${themeTransition}`,
    `-webkit-backdrop-filter ${themeTransition}`,
    `border-color ${themeTransition}`,
    `box-shadow ${themeTransition}`,
    `color ${themeTransition}`
  ].join(', ');

  return (
    <motion.header
      className={`fixed inset-x-4 top-4 z-[10050] overflow-hidden rounded-4xl ${
        navbarTheme === 'dark'
          ? 'border border-white/20 text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)]'
          : 'border border-black/10 text-black shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
      }`}
      initial={false}
      animate={{
        y: scrollHidden ? 'calc(-100% - 1.5rem)' : '0%',
        opacity: showNavbar ? 1 : 0
      }}
      transition={{
        y: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
        opacity: { duration: 0.8, ease: 'easeOut', delay: showNavbar ? 0.2 : 0 }
      }}
      style={{
        pointerEvents: showNavbar ? 'auto' : 'none',
        transition: navbarThemeStyleTransition,
        ...(navbarTheme === 'dark'
          ? {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }
          : {
              background: '#ffffff',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none'
            })
      }}
    >
      <nav className="flex h-[60px] items-center justify-between pl-6 pr-8">
        {/* Logo — left side */}
        <span
          className="flex size-[50px] shrink-0 cursor-default items-center justify-center"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <motion.img
            src={navbarTheme === 'dark' ? LOGO_DARK : LOGO_LIGHT}
            alt=""
            aria-hidden
            className="h-[35px] w-[35px]"
            animate={{
              rotate: logoHovered ? -90 : 0
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut'
            }}
          />
        </span>

        {/* Nav links — right side */}
        <div className="flex items-center">
          <Link to={ROUTES.HOME} className={linkClass}>
            HOME
          </Link>
          <Link to={ROUTES.ABOUT} className={linkClass}>
            ABOUT
          </Link>
          <Link to={ROUTES.WORKS.ROOT} className={linkClass}>
            WORKS
          </Link>
          <Link to={ROUTES.ARCHIVE.ROOT} className={linkClass}>
            ARCHIVE
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
