import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { ROUTES, EXTERNAL_LINKS } from '../constants/routes';
import logo from '/favicon.webp';
import InstagramIcon from '../assets/icons/instagram-black.webp';
import LinkedinIcon from '../assets/icons/linkedin-black.webp';

export default function Navbar({ showNavbar = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showArchiveDropdown, setShowArchiveDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isFirstInteractionRef = useRef(true);
  const hasExpandedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Expand navbar when it first becomes visible (desktop only)
  useEffect(() => {
    if (showNavbar && isFirstInteractionRef.current && !isMobile && !hasExpandedRef.current) {
      setIsExpanded(true);
      setIsHovered(true);
      hasExpandedRef.current = true;
    }
  }, [showNavbar, isMobile]);

  const handleNavbarMouseEnter = () => {
    if (isMobile) return;
    
    if (isFirstInteractionRef.current) {
      isFirstInteractionRef.current = false;
    } else {
      setIsExpanded(true);
      setIsHovered(true);
    }
  };
  
  const handleNavbarMouseLeave = () => {
    if (isMobile) return;
    
    if (!showArchiveDropdown) {
      setIsExpanded(false);
      setIsHovered(false);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (isMobile) return;
    
    setShowArchiveDropdown(false);
    setIsExpanded(false);
    setIsHovered(false);
  };

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
          className="fixed top-6 right-6 w-[50px] h-[50px] bg-white border-0 rounded-full cursor-pointer z-[10002] flex flex-col items-center justify-center gap-1 shadow-[0_4px_30px_rgba(0,0,0,0.1)] sm:w-[45px] sm:h-[45px]"
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
              className="fixed top-0 left-0 w-screen h-screen bg-white z-[10001] flex items-start justify-start pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-start gap-0 w-full h-full p-8 max-[360px]:gap-6">
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
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          if (location.pathname === ROUTES.HOME) {
                            const element = document.querySelector('#works');
                            if (element) {
                              window.scrollTo({ 
                                top: element.offsetTop, 
                                behavior: 'smooth' 
                              });
                            }
                          } else {
                            navigate('/#works');
                          }
                        }}
                        className="text-[3.2rem] font-semibold text-black no-underline transition-colors duration-300 ease-in-out hover:text-[rgb(140,140,140)] cursor-pointer bg-transparent border-0 p-0"
                      >
                        WORKS
                      </button>
                    </motion.div>
                  </div>

                  {/* Second Group: STUDIO, EXPERIMENTS, PHOTOGRAPHY */}
                  <div className="flex flex-col items-start gap-2 mt-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                    >
                      <Link
                        to={ROUTES.ARCHIVE.STUDIO.ROOT}
                        className="text-[1.5rem] font-semibold text-black no-underline transition-colors duration-300 ease-in-out hover:text-[rgb(140,140,140)]"
                        onClick={closeMobileMenu}
                      >
                        STUDIO
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <Link
                        to={ROUTES.ARCHIVE.EXPERIMENTS.ROOT}
                        className="text-[1.5rem] font-semibold text-black no-underline transition-colors duration-300 ease-in-out hover:text-[rgb(140,140,140)]"
                        onClick={closeMobileMenu}
                      >
                        EXPERIMENTS
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                    >
                      <a
                        href={ROUTES.PHOTOGRAPHY}
                        className="text-[1.5rem] font-semibold text-black no-underline transition-colors duration-300 ease-in-out hover:text-[rgb(140,140,140)]"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMobileMenu}
                      >
                        PHOTOGRAPHY
                      </a>
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
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop navbar (original design)
  return (
    <div className="relative">
      <motion.nav
        className="fixed top-8 right-8 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/10 rounded-full overflow-visible z-[10000] text-black"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showNavbar ? 1 : 0,
          width: isExpanded ? '28rem' : '3.3rem' 
        }}
        transition={{ 
          opacity: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
          width: { duration: 0.3, ease: 'easeInOut' }
        }}
        onMouseEnter={handleNavbarMouseEnter}
        onMouseLeave={handleNavbarMouseLeave}
      >
        <div className="flex items-center justify-between h-[50px] p-0 w-full relative">
         {/* Expanded menu items */}
          <AnimatePresence>
            {isExpanded && (
              <div className="flex items-center justify-evenly w-full pr-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Link
                    to={ROUTES.ABOUT}
                    className="no-underline text-base font-medium whitespace-nowrap transition-colors duration-[0.4s] ease-in-out py-2 px-2 block text-black hover:text-[rgb(140,140,140)]"
                  >
                    ABOUT
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <button
                    onClick={() => {
                      if (location.pathname === ROUTES.HOME) {
                        const element = document.querySelector('#works');
                        if (element) {
                          window.scrollTo({ 
                            top: element.offsetTop, 
                            behavior: 'smooth' 
                          });
                        }
                      } else {
                        navigate('/#works');
                      }
                    }}
                    className="no-underline text-base font-medium whitespace-nowrap transition-colors duration-[0.4s] ease-in-out py-2 px-2 block text-black hover:text-[rgb(140,140,140)] cursor-pointer bg-transparent border-0"
                  >
                    WORKS
                  </button>
                </motion.div>
                

                <motion.div
                  className="relative py-2 cursor-default"
                  onMouseEnter={() => setShowArchiveDropdown(true)}
                  onMouseLeave={() => setShowArchiveDropdown(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <a className="no-underline text-base font-medium whitespace-nowrap transition-colors duration-[0.4s] ease-in-out py-2 px-2 block w-full cursor-default text-black">
                    ARCHIVE
                  </a>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          <div className="flex justify-center items-center w-[50px] h-[50px] shrink-0 absolute right-0 top-0 z-10">
            <Link to={ROUTES.HOME} className="flex justify-center items-center w-full h-full no-underline">
              <motion.img 
                src={logo} 
                alt="logo"
                className="h-[30px] w-[30px] cursor-pointer"
                animate={{ 
                  rotate: (isHovered || showArchiveDropdown) ? -90 : 0 
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: 'easeInOut' 
                }}
              />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Invisible bridge to fill the gap */}
      <AnimatePresence>
        {showArchiveDropdown && isExpanded && (
          <div
            className="absolute top-[calc(2rem+50px)] left-8 w-[28rem] h-[0.3rem] pointer-events-auto"
            onMouseEnter={() => {
              setShowArchiveDropdown(true);
              setIsExpanded(true);
              setIsHovered(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Dropdown menu OUTSIDE navbar */}
      <AnimatePresence>
        {showArchiveDropdown && isExpanded && (
          <motion.div
            className="fixed top-[calc(2rem+50px+0.3rem)] right-[4.9rem] bg-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-2xl min-w-[140px] z-[10001]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => {
              setShowArchiveDropdown(true);
              setIsExpanded(true);
              setIsHovered(true);
            }}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <Link
              to={ROUTES.ARCHIVE.STUDIO.ROOT}
              className="block py-3 px-4 no-underline text-base font-medium text-center transition-colors duration-[0.4s] ease-in-out text-black hover:text-[rgb(140,140,140)]"
            >
              STUDIO
            </Link>
            <Link
              to={ROUTES.ARCHIVE.EXPERIMENTS.ROOT}
              className="block py-3 px-4 no-underline text-base font-medium text-center transition-colors duration-[0.4s] ease-in-out text-black hover:text-[rgb(140,140,140)]"
            >
              EXPERIMENTS
            </Link>
            <a
              href={ROUTES.PHOTOGRAPHY}
              className="block py-3 px-4 no-underline text-base font-medium text-center transition-colors duration-[0.4s] ease-in-out text-black hover:text-[rgb(140,140,140)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              PHOTOGRAPHY
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}