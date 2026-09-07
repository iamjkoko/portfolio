import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES, EXTERNAL_LINKS } from '../constants/routes';
import InstagramIcon from '../assets/icons/instagram-black.webp';
import LinkedinIcon from '../assets/icons/linkedin-black.webp';
import ArenaIcon from '../assets/icons/are.na-black.webp';
import { useLenis } from './LenisProvider';
import useIsMobile from '../hooks/useIsMobile';

const LOGO = '/favicon-black.svg';

const desktopLinks = [
  { label: 'WORKS', to: ROUTES.WORKS.ROOT },
  { label: 'ABOUT', to: ROUTES.ABOUT },
  { label: 'ARCHIVE', to: ROUTES.ARCHIVE.MOTION.ROOT }
] as const;

function isNavActive(pathname: string, to: string): boolean {
  if (to === ROUTES.HOME) return pathname === ROUTES.HOME;
  if (to === ROUTES.ABOUT) return pathname === ROUTES.ABOUT;
  if (to === ROUTES.WORKS.ROOT) return pathname.startsWith(ROUTES.WORKS.ROOT);
  if (to.startsWith('/archive')) return pathname.startsWith('/archive');
  return pathname === to;
}

interface NavbarProps {
  showNavbar?: boolean;
}

export default function Navbar({ showNavbar = true }: NavbarProps) {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  const lenis = useLenis();
  const location = useLocation();
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (isMobile) setScrollHidden(false);
  }, [isMobile]);

  useEffect(() => {
    setScrollHidden(false);
  }, [location.pathname]);

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
      { label: 'Works', to: ROUTES.WORKS.ROOT, index: '02' },
      { label: 'About', to: ROUTES.ABOUT, index: '03' },
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
              <img src={LOGO} alt="" aria-hidden className="h-[30px] w-[30px]" />
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
                  {mobileLinks.map((item, i) => {
                    const isActive = isNavActive(location.pathname, item.to);

                    return (
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
                          className={`group flex items-baseline gap-4 py-5 text-black no-underline ${
                            isActive ? 'cursor-default' : 'cursor-pointer'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <span
                            className={`text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                              isActive ? 'text-black' : 'text-black/40'
                            }`}
                          >
                            {item.index}
                          </span>
                          <span
                            className="text-[3rem] leading-[0.95] tracking-[-0.01em] max-[360px]:text-[2.6rem]"
                            style={{
                              fontFamily: 'var(--font-family-boska)',
                              fontVariationSettings: isActive ? "'wght' 800" : "'wght' 500"
                            }}
                          >
                            {item.label}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
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

  return (
    <motion.header
      className="fixed inset-x-4 top-4 z-[10050] overflow-hidden rounded-4xl border border-black/10 bg-[#ffffff] text-black shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
      initial={false}
      animate={{
        y: scrollHidden ? 'calc(-100% - 1.5rem)' : '0%',
        opacity: showNavbar ? 1 : 0
      }}
      transition={{
        y: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
        opacity: { duration: 0.8, ease: 'easeOut', delay: showNavbar ? 0.2 : 0 }
      }}
      style={{ pointerEvents: showNavbar ? 'auto' : 'none' }}
    >
      <nav className="flex h-[60px] items-center justify-between pl-6 pr-8">
        {/* Logo — left side */}
        <Link
          to={ROUTES.HOME}
          aria-label="Home"
          className="flex size-[50px] shrink-0 items-center justify-center no-underline"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <motion.img
            src={LOGO}
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
        </Link>

        {/* Nav links — right side */}
        <div className="flex items-center">
          {desktopLinks.map(({ label, to }) => {
            const isActive = isNavActive(location.pathname, to);

            return (
              <Link
                key={to}
                to={to}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex no-underline whitespace-nowrap py-2 px-4 text-base text-black transition-[color_0.3s_ease] ${
                  isActive
                    ? 'cursor-default'
                    : 'cursor-pointer hover:text-[rgb(140,140,140)]'
                }`}
                style={{ fontVariationSettings: isActive ? "'wght' 600" : "'wght' 500" }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
}
