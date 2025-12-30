import React, { useEffect } from 'react';
import '../global.css';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { ChevronDown, ArrowRight } from 'lucide-react';

import Tooltip from '../components/Tooltip';
import Underline from '../components/Underline';
import ColorBends from '../components/ColorBends';
import StaggeredText from '../components/StaggeredText';

import Footer from '../components/Footer';

import InstagramIcon from '../assets/icons/instagram-white.webp';
import LinkedinIcon from '../assets/icons/linkedin-white.webp';

import Caveman from '../assets/images/works/caveman/caveman.webp';

const Home = () => {
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      sessionStorage.setItem("hasVisited", "true");
    }
    
    // Dispatch event to show navbar after intro completes with additional delay
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('introComplete'));
    }, 300);
  }, []);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const setupObserver = () => {
      const fadeInContainers = document.querySelectorAll(".fade-container");
      if (fadeInContainers.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
  }, []);

  return (
    <>
      <section 
        id="hero" 
        className="flex justify-center items-center h-screen relative overflow-hidden"
      >
        <h1 className="intro-title">Crafting ideas into form.</h1>
        <ColorBends
          colors={["#ffffff"]} 
          rotation={80}
          autoRotate={2}
          speed={0.3}
          scale={0.7}
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
        className="w-full h-screen flex text-center justify-center items-center bg-black opacity-100 relative m-0 border-none max-lg:h-[calc(100vh+80px)]"
      >
        <div className="opacity-100 w-full h-full flex flex-col relative">
          <div className="flex flex-col items-center w-full flex-1 justify-center">
            <div className="fade-container flex flex-col text-white w-[45%] max-lg:w-[70%] max-lg:p-[2%] text-center">
              <p className="fade-in font-extralight text-lg max-lg:text-[0.75rem] leading-[1.8]">
                <strong className="font-bold">Eric Ko</strong> (b. 2004) is a multidisciplinary artist and designer currently pursuing a <strong className="font-bold">BFA in Industrial Design</strong> at the <strong className="font-bold">Rhode Island School of Design (RISD)</strong>.
              </p>
              <br />
              <br />
              <p className="fade-in font-extralight text-lg max-lg:text-[0.75rem] leading-[1.8]">
                Born and raised in <strong className="font-bold">Seoul, South Korea</strong>, and having spent four years in <strong className="font-bold">São Paulo, Brazil</strong>, his works are shaped by his cultural experiences and curiosity about the intersection of <strong className="font-bold">technology, innovation,</strong> and <strong className="font-bold">sustainability</strong>.
              </p>
              <br />
            </div>
          
            <div className="fade-container">
            <div className="fade-in flex flex-col items-center pt-8 max-lg:pt-0 max-lg:pb-20">
              <div className="flex justify-center max-lg:pb-0 max-lg:text-[0.75rem]">
                <Link to={ROUTES.ABOUT} className="text-white underline underline-offset-2 transition-opacity duration-300 ease-in-out hover:opacity-70">
                  LEARN MORE
                </Link>
              </div>
        
              <div className="hidden lg:flex justify-center gap-[15px] pt-10 max-lg:gap-[30px] max-lg:pt-2">
                <a href="https://www.instagram.com/morebyko/" className="instagram" target="_blank" rel="noopener noreferrer">
                  <img src={InstagramIcon} alt="Instagram" className="max-w-[1.375rem] max-h-[1.375rem] max-lg:max-w-[2rem] max-lg:max-h-[2rem]" />
                </a>
                <a href="https://www.linkedin.com/in/ericko26" className="linkedin" target="_blank" rel="noopener noreferrer">
                  <img src={LinkedinIcon} alt="LinkedIn" className="max-w-[1.375rem] max-h-[1.375rem] max-lg:max-w-[2rem] max-lg:max-h-[2rem]" />
                </a>
              </div>
            </div>
            </div>

            <div className="fade-container absolute bottom-0 left-0 right-0"> 
            <div className="fade-in flex flex-col items-center gap-2 pt-8 pb-8">
              <div className="text-white text-sm max-lg:text-[0.75rem] transition-opacity duration-300 ease-in-out"
              >
                SEE LATEST PROJECTS
              </div>
              <ChevronDown className="w-4 h-4 text-white" />
            </div>
            </div>
          </div>
        </div>
      </section>

      <section id="works" className="w-full min-h-screen flex flex-col items-center bg-white pt-32 pb-16 max-lg:pt-10 max-lg:pb-10">
        <div className="flex flex-col gap-[2rem] w-full px-[8rem] max-lg:p-[0.625rem] max-lg:gap-[15px]">

        {/* Ko: Logo Animation */}
        <Tooltip content="View work">
        <Link to={ROUTES.WORKS.LOGO}>
        <div className="fade-container flex items-start gap-[15px] w-full max-lg:flex-col max-lg:flex-col-reverse max-lg:px-[1rem]">
            <div className="fade-in flex-1 flex items-start pt-[2rem] max-lg:w-full max-lg:pt-4 max-lg:justify-start max-lg:items-start">
                <div className="text-black transition-opacity">
                    <h2 className="text-3xl font-medium pb-[1rem] max-lg:text-xl max-lg:text-left max-lg:pl-[0.5rem]">Ko: Logo Animation</h2>
                    <h4 className="text-md font-light pr-[8rem] text-[rgb(118,118,118)] [max-lg:text-base max-lg:text-left max-lg:pl-[0.5rem] max-lg:pr-[0.5rem] max-lg:text-sm">A short typography animation, which aims to explore the elements of personal branding and motion design.</h4>

                     <div className="flex flex-row flex-wrap gap-3 pt-8 max-lg:py-0 max-lg:pt-8 max-lg:pb-8 max-lg:pl-[0.5rem]">
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-lg:text-[0.75rem] max-lg:py-[0.25rem] max-lg:px-3">TYPOGRAPHY</span>
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-lg:text-[0.75rem] max-lg:py-[0.25rem] max-lg:px-3">ANIMATION</span>
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-lg:text-[0.75rem] max-lg:py-[0.25rem] max-lg:px-3">BRANDING</span>
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-lg:text-[0.75rem] max-lg:py-[0.25rem] max-lg:px-3">MOTION DESIGN</span>
                    </div>
                </div>
            </div>
            <div className="fade-in flex-1 border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden max-lg:w-full">
                <div className="w-[720px] h-[480px] max-lg:w-[720px] max-lg:h-[480px] max-md:w-full max-md:h-auto max-md:aspect-[3/2] overflow-hidden">
                    <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src="https://res.cloudinary.com/db6ifdikq/video/upload/v1764331938/logo_n5druz_1_yopcck.mp4" type="video/mp4"/>Your browser does not support the video tag.</video>
                </div>
            </div>
        </div>
        </Link>
        </Tooltip>

        <br />
        
        {/* Modern Caveman */}
        <Tooltip content="View work">
        <Link to={ROUTES.WORKS.CAVEMAN}>
        <div className="fade-container flex items-start gap-[15px] w-full max-lg:flex-col max-lg:flex-col-reverse max-lg:px-[1rem]">
            <div className="fade-in flex-1 flex items-start pt-[2rem] max-lg:w-full max-lg:pt-4 max-lg:justify-start max-lg:items-start">
                <div className="text-black transition-opacity">
                    <h2 className="text-3xl font-medium pb-[1rem] max-lg:text-xl max-lg:text-left max-lg:pl-[0.5rem]">Modern Caveman</h2>
                    <h4 className="text-md font-light pr-[8rem] text-[rgb(118,118,118)] [max-lg:text-base max-lg:text-left max-lg:pl-[0.5rem] max-lg:pr-[0.5rem] max-lg:text-sm">A series of shadow-based explorations inspired by Plato's Allegory of the Cave, which prompts viewers to pause, reflect, and reconsider how they perceive reality.</h4>

                     <div className="flex flex-row flex-wrap gap-3 pt-8 max-lg:py-0 max-lg:pt-8 max-lg:pb-8 max-lg:pl-[0.5rem]">
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-lg:text-[0.75rem] max-lg:py-[0.25rem] max-lg:px-3">CONCEPTUAL</span>
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-lg:text-[0.75rem] max-lg:py-[0.25rem] max-lg:px-3">3D RENDERING</span>
                    </div>
                </div>
            </div>
            <div className="fade-in flex-1 border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden max-lg:w-full">
            <div className="w-[720px] h-[480px] max-lg:w-[720px] max-lg:h-[480px] max-md:w-full max-md:h-auto max-md:aspect-[3/2] overflow-hidden">
                <img className="block w-full h-full object-cover rounded-none" src={Caveman} />
            </div>
            </div>
        </div>
        </Link>
        </Tooltip>
        
        <div className="flex justify-end pt-20 max-lg:pt-10">
          <Link to={ROUTES.WORKS.ROOT} className="flex items-center gap-2 text-[rgb(118,118,118)] text-lg max-lg:px-[1.25rem] max-lg:text-sm group">
            VIEW ALL PROJECTS
            <ArrowRight className="w-5 h-5 max-lg:w-4 max-lg:h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>
        </div>
    </section>

      <Footer theme='light' />
    </>
  );
};

export default Home;