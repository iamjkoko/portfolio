import React, { useEffect, useState } from 'react';
import '../global.css';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import Placeholder from '../assets/images/background/placeholder-lt.png';
import ColorBends from '../components/ColorBends';

import Footer from '../components/Footer';

import InstagramIcon from '../assets/icons/instagram-white.webp';
import LinkedinIcon from '../assets/icons/linkedin-white.webp';

import Caveman from '../assets/images/works/caveman/caveman.webp';

const Home = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [introStep, setIntroStep] = useState(0);
  const [initialHash, setInitialHash] = useState('');

  useEffect(() => {
    setInitialHash(window.location.hash);
  }, []);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      sessionStorage.setItem("hasVisited", "true");
      setShowIntro(true);
      
      // Intro animation timing
      setTimeout(() => setIntroStep(1), 100);
      setTimeout(() => setIntroStep(2), 1800);
      setTimeout(() => {
        // Dispatch event to show navbar after intro completes with additional delay
        window.dispatchEvent(new CustomEvent('introComplete'));
      }, 800);
    } else {
      // If user has already visited, still respect the timing for consistency
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('introComplete'));
      }, 800);
    }
  }, []);

  useEffect(() => {
    if (initialHash === '#works') {
      setTimeout(() => {
        const element = document.querySelector('#works');
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, elementTop);
        }
      }, 0);
    }
  }, [initialHash]);

  // Dispatch intro state changes for SmoothScroll
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('introStateChange', { detail: { showIntro } }));
  }, [showIntro]);


  useEffect(() => {
    if (!showIntro) {
      // Small delay to ensure DOM is ready
      const setupObserver = () => {
        const fadeInContainers = document.querySelectorAll(".fade-container");
        if (fadeInContainers.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Fix: Changed from [class*="fadeIn"] to .fade-in
              const children = entry.target.querySelectorAll('.fade-in');
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.setAttribute('data-visible', 'true');
                }, index * 150);
              });
              observer.unobserve(entry.target);
            }
          });
        }, { 
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        });
        
        fadeInContainers.forEach((container) => observer.observe(container));
      };

      // Small delay to ensure DOM is fully rendered
      setTimeout(setupObserver, 100);
    }
  }, [showIntro]);

  return (
    <>
      <section 
        id="hero" 
        className="flex justify-center items-center h-screen relative overflow-hidden"
      >
        <motion.div
          className="intro-title"
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: 0,
            opacity: 1
          }}
          transition={{ 
            y: { duration: 0.5, ease: [0.3, 0.05, 0.01, 0.9] },
            opacity: { duration: 0.3 }
          }}
        >
          Crafting ideas into form.
        </motion.div>
        <ColorBends
          colors={["#ffffff"]} 
          rotation={50}
          speed={0.3}
          scale={0.8}
          frequency={2}
          warpStrength={1.1}
          mouseInfluence={0.5}
          parallax={0.6}
          noise={0.08}
          transparent={false}
        />
      </section>

      <section 
        id="about" 
        className="w-full h-screen flex text-center justify-center items-center bg-black opacity-100 relative m-0 border-none"
      >
        <div className="opacity-100 w-full h-full flex flex-col relative">
          <div className="fade-container flex flex-col items-center w-full flex-1 justify-center">
            <div className="flex flex-col text-white w-[45%] max-[935px]:w-[70%] max-[935px]:p-[2%] text-center">
              <p className="fade-in font-extralight text-lg max-[935px]:text-[0.9rem] leading-[1.8]">
                <strong className="font-bold">Eric Ko</strong> (b. 2004) is a multidisciplinary artist and designer currently pursuing a <strong className="font-bold">BFA in Industrial Design</strong> at the <strong className="font-bold">Rhode Island School of Design (RISD)</strong>.
              </p>
              <br />
              <br />
              <p className="fade-in font-extralight text-lg max-[935px]:text-[0.9rem] leading-[1.8]">
                Born and raised in <strong className="font-bold">Seoul, South Korea</strong>, and having spent four years in <strong className="font-bold">São Paulo, Brazil</strong>, his works are shaped by his cultural experiences and curiosity about the intersection of <strong className="font-bold">technology, innovation,</strong> and <strong className="font-bold">sustainability</strong>.
              </p>
              <br />
            </div>
          
            <div className="fade-in flex flex-col items-center pt-8 max-[935px]:pt-0">
              <div className="flex justify-center max-[935px]:pb-0 max-[935px]:text-[0.8rem]">
                <Link to={`${ROUTES.ABOUT}#about-page`} className="text-white underline underline-offset-2 transition-opacity duration-300 ease-in-out hover:opacity-70">
                  LEARN MORE
                </Link>
              </div>
        
              <div className="hidden min-[936px]:flex justify-center gap-[15px] pt-10 max-[935px]:gap-[30px] max-[935px]:pt-2">
                <a href="https://www.instagram.com/morebyko/" className="instagram" target="_blank" rel="noopener noreferrer">
                  <img src={InstagramIcon} alt="Instagram" className="max-w-[1.375rem] max-h-[1.375rem] max-[935px]:max-w-[2rem] max-[935px]:max-h-[2rem]" />
                </a>
                <a href="https://www.linkedin.com/in/ericko26" className="linkedin" target="_blank" rel="noopener noreferrer">
                  <img src={LinkedinIcon} alt="LinkedIn" className="max-w-[1.375rem] max-h-[1.375rem] max-[935px]:max-w-[2rem] max-[935px]:max-h-[2rem]" />
                </a>
              </div>
            </div>

            <div className="fade-in flex flex-col items-center gap-2 pt-8 pb-8 absolute bottom-0 left-0 right-0">
              <a 
                href="#works" 
                className="text-white text-sm max-[935px]:text-xs transition-opacity duration-300 ease-in-out hover:opacity-70"
              >
                SEE LATEST PROJECTS
              </a>
              <ChevronDown className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </section>

      <section id="works" className="w-full min-h-screen flex flex-col items-center bg-white pt-32 pb-[3.75rem] max-[935px]:pt-10 max-[935px]:pb-10">
        <div className="grid grid-cols-2 gap-[15px] justify-items-center mx-auto overflow-hidden px-[1.875rem] max-[935px]:grid-cols-1 max-[935px]:p-[0.625rem] max-[935px]:gap-[15px]">
        <div className="border-2 border-[#f6f6f6] overflow-hidden">
            <Link to={ROUTES.WORKS.LOGO}>
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:w-full max-[935px]:h-auto">
                <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src="https://res.cloudinary.com/db6ifdikq/video/upload/v1750039959/logo_n5druz.mp4" type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
            </Link>
        </div>
        <div className="border-2 border-[#f6f6f6] overflow-hidden">
            <Link to={ROUTES.WORKS.CAVEMAN}>
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:w-full max-[935px]:h-auto">
                <img className="block w-full h-full object-cover rounded-none" src={Caveman} />
            </div>
            </Link>
        </div>
        
        {/* Placeholders */}
        <div className="border-2 border-[#f6f6f6] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:w-full max-[935px]:h-auto">
                <img className="block w-full h-full object-cover rounded-none" src={Placeholder} />
            </div>
        </div>
        <div className="border-2 border-[#f6f6f6] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:w-full max-[935px]:h-auto">
                <img className="block w-full h-full object-cover rounded-none" src={Placeholder} />
            </div>
        </div>
        </div>
    </section>

      <Footer theme='light' />
    </>
  );
};

export default Home;