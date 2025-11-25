import React, { useEffect, useState } from 'react';
import '../global.css';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import ColorBends from '../components/ColorBends';

import Footer from '../components/Footer';

import InstagramIcon from '../assets/icons/instagram-white.webp';
import LinkedinIcon from '../assets/icons/linkedin-white.webp';

import Caveman from '../assets/images/works/caveman/caveman.webp';

const Home = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [setIntroStep] = useState(0);

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
          rotation={80}
          autoRotate={2}
          speed={0.3}
          scale={1.8}
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
        className="w-full h-screen flex text-center justify-center items-center bg-black opacity-100 relative m-0 border-none max-[935px]:h-[calc(100vh+80px)]"
      >
        <div className="opacity-100 w-full h-full flex flex-col relative">
          <div className="fade-container flex flex-col items-center w-full flex-1 justify-center">
            <div className="flex flex-col text-white w-[45%] max-[935px]:w-[70%] max-[935px]:p-[2%] text-center">
              <p className="fade-in font-extralight text-lg max-[935px]:text-[0.75rem] leading-[1.8]">
                <strong className="font-bold">Eric Ko</strong> (b. 2004) is a multidisciplinary artist and designer currently pursuing a <strong className="font-bold">BFA in Industrial Design</strong> at the <strong className="font-bold">Rhode Island School of Design (RISD)</strong>.
              </p>
              <br />
              <br />
              <p className="fade-in font-extralight text-lg max-[935px]:text-[0.75rem] leading-[1.8]">
                Born and raised in <strong className="font-bold">Seoul, South Korea</strong>, and having spent four years in <strong className="font-bold">São Paulo, Brazil</strong>, his works are shaped by his cultural experiences and curiosity about the intersection of <strong className="font-bold">technology, innovation,</strong> and <strong className="font-bold">sustainability</strong>.
              </p>
              <br />
            </div>
          
            <div className="fade-in flex flex-col items-center pt-8 max-[935px]:pt-0 max-[935px]:pb-20">
              <div className="flex justify-center max-[935px]:pb-0 max-[935px]:text-[0.75rem]">
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
              <div className="text-white text-sm max-[935px]:text-[0.75rem] transition-opacity duration-300 ease-in-out"
              >
                SEE LATEST PROJECTS
              </div>
              <ChevronDown className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </section>

      <section id="works" className="w-full min-h-screen flex flex-col items-center bg-white pt-32 pb-16 max-[935px]:pt-10 max-[935px]:pb-10">
        <div className="flex flex-col gap-[2rem] w-full px-[8rem] max-[935px]:p-[0.625rem] max-[935px]:gap-[15px]">

        {/* Logo */}
        <div className="flex items-start gap-[15px] w-full max-[935px]:flex-col max-[935px]:flex-col-reverse max-[935px]:px-[1rem]">
            <div className="flex-1 flex items-start pt-[2rem] max-[935px]:w-full max-[935px]:pt-4 max-[935px]:justify-start max-[935px]:items-start">
                <Link to={ROUTES.WORKS.LOGO} className="text-black transition-opacity">
                    <h2 className="text-3xl font-medium pb-[1rem] max-[935px]:text-xl max-[935px]:text-left max-[935px]:pl-[0.5rem]">Ko: Logo Animation</h2>
                    <h4 className="text-md font-light pr-[8rem] text-[rgb(118,118,118)] [max-[935px]:text-base max-[935px]:text-left max-[935px]:pl-[0.5rem] max-[935px]:pr-[0.5rem] max-[935px]:text-sm">A short typography animation, which aims to explore the elements of personal branding and motion design.</h4>
                    
                </Link>
            </div>
            <div className="flex-1 border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden max-[935px]:w-full">
                <Link to={ROUTES.WORKS.LOGO}>
                <div className="aspect-[3/2] w-full max-w-[1080px] overflow-hidden">
                    <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src="https://res.cloudinary.com/db6ifdikq/video/upload/v1750039959/logo_n5druz.mp4" type="video/mp4"/>Your browser does not support the video tag.</video>
                </div>
                </Link>
            </div>
        </div>

        <br />
        
        {/* Caveman */}
        <div className="flex items-start gap-[15px] w-full max-[935px]:flex-col max-[935px]:flex-col-reverse max-[935px]:px-[1rem]">
            <div className="flex-1 flex items-start pt-[2rem] max-[935px]:w-full max-[935px]:pt-4 max-[935px]:justify-start max-[935px]:items-start">
                <Link to={ROUTES.WORKS.CAVEMAN} className="text-black transition-opacity">
                    <h2 className="text-3xl font-medium pb-[1rem] max-[935px]:text-xl max-[935px]:text-left max-[935px]:pl-[0.5rem]">Modern Caveman</h2>
                    <h4 className="text-md font-light pr-[8rem] text-[rgb(118,118,118)] [max-[935px]:text-base max-[935px]:text-left max-[935px]:pl-[0.5rem] max-[935px]:pr-[1rem] max-[935px]:text-sm">A series of shadow-based explorations inspired by Plato's Allegory of the Cave, which prompts viewers to pause, reflect, and reconsider how they perceive reality.</h4>
                </Link>
            </div>
            <div className="flex-1 border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden max-[935px]:w-full">
                <Link to={ROUTES.WORKS.CAVEMAN}>
                <div className="aspect-[3/2] w-full max-w-[1080px] max-[935px]:max-w-[720px] overflow-hidden">
                    <img className="block w-full h-full object-cover rounded-none" src={Caveman} />
                </div>
                </Link>
            </div>
        </div>
        
        <div className="flex flex-row justify-center flex-wrap gap-3 pt-20">
          <span className="text-[0.9rem] font-normal py-4 px-10 rounded-[30px] bg-[#f0f0f0]">
            <Link to={ROUTES.WORKS.ROOT} className="text-[rgb(118,118,118)] transition-opacity duration-300 ease-in-out">
              VIEW ALL PROJECTS
            </Link>
          </span>
        </div>
        </div>
    </section>

      <Footer theme='light' />
    </>
  );
};

export default Home;