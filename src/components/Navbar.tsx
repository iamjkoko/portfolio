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

  // Mobile fullscreen menu
  if (isMobile) {
    return (
      <>
        {/* Hamburger Button */}
        <motion.button
          className="fixed top-6 right-6 w-[50px] h-[50px] bg-white border-0 rounded-full cursor-pointer z-[10062] flex flex-col items-center justify-center gap-1 shadow-[0_4px_30px_rgba(0,0,0,0.1)] sm:w-[45px] sm:h-[45px]"
          onClick={toggleMobileMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: showNavbar ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <motion.span
            className="w-6 h-0.5 bg-black block origin-center rounded-sm sm:w-5"
            animate={{
              rotate: mobileMenuOpen ? 45 : 0,
              y: mobileMenuOpen ? 6 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
          <motion.span
            className="w-6 h-0.5 bg-black block origin-center rounded-sm sm:w-5"
            animate={{
              opacity: mobileMenuOpen ? 0 : 1,
              scale: mobileMenuOpen ? 0 : 1
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
          <motion.span
            className="w-6 h-0.5 bg-black block origin-center rounded-sm sm:w-5"
            animate={{
              rotate: mobileMenuOpen ? -45 : 0,
              y: mobileMenuOpen ? -6 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </motion.button>

        {/* Fullscreen Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed top-0 left-0 w-screen h-screen bg-white z-[10060] flex items-start justify-start pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-start gap-0 w-full h-full py-8 px-[var(--page-padding-x-mobile)] max-[360px]:gap-6">
                <div className="flex flex-col items-start gap-0">
                  {/* First Group: HOME, ABOUT, WORKS */}
                  <div className="flex flex-col items-start gap-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      <Link
                        to={ROUTES.HOME}
                        className="text-[3.2rem] font-semibold text-black no-underline transition-colors duration-300 ease-in-out hover:text-[rgb(140,140,140)]"
                        onClick={closeMobileMenu}
                      >
                        HOME
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                    >
                      <Link
                        to={ROUTES.ABOUT}
                        className="text-[3.2rem] font-semibold text-black no-underline transition-colors duration-300 ease-in-out hover:text-[rgb(140,140,140)]"
                        onClick={closeMobileMenu}
                      >
                        ABOUT
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <Link
                        to={ROUTES.WORKS.ROOT}
                        className="text-[3.2rem] font-semibold text-black no-underline transition-colors duration-300 ease-in-out hover:text-[rgb(140,140,140)]"
                        onClick={closeMobileMenu}
                      >
                        WORKS
                      </Link>
                    </motion.div>
                  </div>

                  {/* Second Group: ARCHIVE */}
                  <div className="flex flex-col items-start gap-2 mt-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                    >
                      <Link
                        to={ROUTES.ARCHIVE.ROOT}
                        className="text-[1.5rem] font-semibold text-black no-underline transition-colors duration-300 ease-in-out hover:text-[rgb(140,140,140)]"
                        onClick={closeMobileMenu}
                      >
                        ARCHIVE
                      </Link>
                    </motion.div>
                  </div>
                </div>

                {/* Social Icons */}
                <motion.div
                  className="flex gap-4 mt-auto pb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <a
                    href={EXTERNAL_LINKS.INSTAGRAM}
                    className="instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    <img
                      src={InstagramIcon}
                      alt="Instagram"
                      className="max-w-[2rem] max-h-[2rem] transition-opacity duration-300 ease-in-out hover:opacity-70"
                    />
                  </a>
                  <a
                    href={EXTERNAL_LINKS.LINKEDIN}
                    className="linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    <img
                      src={LinkedinIcon}
                      alt="LinkedIn"
                      className="max-w-[2rem] max-h-[2rem] transition-opacity duration-300 ease-in-out hover:opacity-70"
                    />
                  </a>
                  <a
                    href={EXTERNAL_LINKS.ARENA}
                    className="arena"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    <img src={ArenaIcon} alt="Arena" className="max-w-[3rem] max-h-[3rem] transition-opacity duration-300 ease-in-out hover:opacity-70" />
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  const linkClass = navbarTheme === 'dark' ? linkClassDark : linkClassDefault;

  return (
    <motion.header
      className={`fixed inset-x-4 top-6 z-[10050] overflow-hidden rounded-4xl ${
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
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
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
