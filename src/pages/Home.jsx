import React, { useEffect, useState } from 'react';
import '../global.css';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { motion, AnimatePresence } from 'framer-motion';

import styles from '../styles/home.module.css';
import Background from '../assets/images/background/main-background-1.png';

import Footer from '../components/Footer';

import InstagramIcon from '../assets/icons/instagram-white.png';
import LinkedinIcon from '../assets/icons/linkedin-white.png';

const Home = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [introStep, setIntroStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setIsLoading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Ensure loading completes within 2-3 seconds
    const loadingTimeout = setTimeout(() => {
      clearInterval(loadingInterval);
      setLoadingProgress(100);
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(loadingInterval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const hasVisited = sessionStorage.getItem("hasVisited");
      if (!hasVisited) {
        sessionStorage.setItem("hasVisited", "true");
        setShowIntro(true);
        
        setTimeout(() => setIntroStep(1), 100);
        setTimeout(() => setIntroStep(2), 1400);
        setTimeout(() => setShowIntro(false), 2000);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && !showIntro) {
      // Add a small delay to ensure smooth transition from loading
      setTimeout(() => {
        const fadeInContainers = document.querySelectorAll(".fade-container");
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const children = entry.target.querySelectorAll('[class*="fadeIn"]');
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.setAttribute('data-visible', 'true');
                }, index * 150); // Slightly increased delay for smoother effect
              });
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        fadeInContainers.forEach((container) => observer.observe(container));
      }, 300);
    }
  }, [isLoading, showIntro]);

  return (
    <>
      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={styles.loadingOverlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.loadingContainer}>
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            className={styles.introOverlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0 }}
            style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >

            <motion.div
              className={styles.introTitle}
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: introStep >= 2 ? -100 : 0,
                opacity: introStep >= 2 ? 0 : 1
              }}
              transition={{ 
                y: { duration: 0.5, ease: [0.3, 0.05, 0.01, 0.9] },
                opacity: { duration: 0.3 }
              }}
            >
              Crafting ideas into form.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Only show when not loading */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <section 
            id="hero" 
            className={styles.hero}
          >
        <img src={Background} className={styles.background} />
  
        <motion.nav 
          className={styles.navbarMain}
          initial={{ opacity: 0 }}
          animate={{ opacity: showIntro ? 0 : 1 }}
          transition={{ duration: 0.2, delay: showIntro ? 0 : 0 }}
        >
          <ul>
            <li><a href="#about">ABOUT</a></li>
            <li><Link to={ROUTES.WORKS.ROOT}>WORKS</Link></li>
            <li><Link to={ROUTES.ARCHIVE.ROOT}>ARCHIVE</Link></li>
            <li><a href="https://filmbyko.cargo.site" target="_blank" rel="noopener noreferrer">PHOTOGRAPHY</a></li>
          </ul>
        </motion.nav>
      </section>

      <section id="about" className={styles.about}>
        <div className={styles.content}>
          <div className="fade-container">
            <div className={styles.aboutContent}>
              <p className={styles.fadeIn}>
                <strong>Eric Ko</strong> (b. 2004) is a multidisciplinary artist and designer currently pursuing a <strong>BFA in Industrial Design</strong> at the <strong>Rhode Island School of Design (RISD)</strong>.
              </p>
              <br />
              <br />
              <p className={styles.fadeIn}>
                Born and raised in <strong>Seoul, South Korea</strong>, and having spent four years in <strong>São Paulo, Brazil</strong>, his works are shaped by his cultural experiences and curiosity about the intersection of <strong>technology, innovation,</strong> and <strong>sustainability</strong>.
              </p>
              <br />
              <br />
            </div>
          
            <div className={styles.fadeIn}>
              <div className={styles.learnMore}>
                <Link to={`${ROUTES.ABOUT}#about-page`} className="learn-more-link">LEARN MORE</Link>
              </div>
        
              <br />
        
              <div className={styles.socials}>
                <a href="https://www.instagram.com/morebyko/" className="instagram" target="_blank">
                  <img src={InstagramIcon} alt="Instagram" />
                </a>
                <a href="https://www.linkedin.com/in/ericko26" className="linkedin" target="_blank">
                  <img src={LinkedinIcon} alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
        </div>
          </section>

          <Footer theme='dark' />
        </motion.div>
      )}
    </>
  );
};

export default Home;