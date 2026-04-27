import { useEffect, useState } from 'react';
import '../global.css';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { VIDEO_URLS } from '../constants/videos';
import { ArrowRight } from 'lucide-react';

import ColorBends from '../components/ColorBends';
import LoadingScreen from '../components/LoadingScreen';
import SplitText from '../components/SplitText';

import Footer from '../components/Footer';

import Caveman from '../assets/images/works/caveman/caveman.webp';
import { INTRO_SEEN_STORAGE_KEY } from '../constants/homeIntro';

const OVERLAY_OPACITY = 0.5;

function getIntroAlreadySeen(): boolean {
  try {
    return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(INTRO_SEEN_STORAGE_KEY) === '1';
  } catch {
    return true;
  }
}

const Home = () => {
  const overlayOpacity = OVERLAY_OPACITY;
  const [fontsReady, setFontsReady] = useState(false);
  const [colorBendsReady, setColorBendsReady] = useState(false);
  const heroReady = fontsReady && colorBendsReady;

  const [introAlreadySeen] = useState(getIntroAlreadySeen);
  const [loadingScreenComplete, setLoadingScreenComplete] = useState(introAlreadySeen);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsReady(true);
    } else {
      document.fonts.ready.then(() => setFontsReady(true));
    }
  }, []);

  useEffect(() => {
    if (introAlreadySeen) {
      window.dispatchEvent(new CustomEvent('introComplete'));
    }
  }, [introAlreadySeen]);

  useEffect(() => {
    if (introAlreadySeen) return;
    if (!heroReady) return;

    const extraDelayMs = 500;

    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem(INTRO_SEEN_STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
      setLoadingScreenComplete(true);
      window.dispatchEvent(new CustomEvent('introComplete'));
    }, extraDelayMs);

    return () => window.clearTimeout(id);
  }, [heroReady, introAlreadySeen]);

  useEffect(() => {
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

    setTimeout(setupObserver, 100);
  }, []);

  return (
    <>
      <LoadingScreen isVisible={!loadingScreenComplete} />
      <section
        id="hero"
        data-navbar-theme="dark"
        className="flex justify-center items-center h-svh relative overflow-hidden"
      >
        <SplitText
          text={[`<strong>Eric Ko</strong> is a<span class="break-mobile"><br></span> <strong>multidisciplinary designer</strong>`, "based in <strong>Providence</strong>.", "", `Currently studying<span class="break-mobile"><br></span> <strong>Graphic Design & CTC</strong> at <a href="https://www.risd.edu" target="_blank" rel="noopener noreferrer" class="risd-link"><strong>RISD</strong></a><svg xmlns="http://www.w3.org/2000/svg" width="0.5em" height="0.5em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:super;margin-left:0.05em;"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>.`]}
          animationReady={loadingScreenComplete}
          className="intro-title z-20 relative"
          delay={200}
          duration={1.25}
          ease="power3.out"
          splitType="lines"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="left"
        />
        <div
          className="absolute inset-0 z-10 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
        <ColorBends
          color="#ffffff"
          rotation={80}
          autoRotate={2}
          speed={0.3}
          scale={0.7}
          frequency={2}
          warpStrength={1.1}
          mouseInfluence={0.5}
          parallax={0.6}
          noise={0.08}
          onReady={() => setColorBendsReady(true)}
        />
      </section>

      <section id="works" className="w-full min-h-screen flex flex-col items-center bg-white pt-32 pb-16 max-[935px]:pt-10 max-[935px]:pb-10">
        <div className="flex flex-col gap-[2rem] w-full px-[8rem] max-[935px]:gap-[15px] max-[935px]:px-[var(--page-padding-x-mobile)]">

        {/* Ko: Logo Animation */}
        <Link to={ROUTES.WORKS.LOGO} className="group block">
        <div className="fade-container flex items-start gap-[15px] w-full max-[935px]:flex-col max-[935px]:flex-col-reverse">
            <div className="fade-in flex-1 flex items-start pt-[2rem] max-[935px]:w-full max-[935px]:pt-4 max-[935px]:justify-start max-[935px]:items-start">
                <div className="text-black transition-opacity">
                    <h2 className="text-3xl font-medium pb-[1rem] max-[935px]:text-xl max-[935px]:text-left">KO: LOGO ANIMATION</h2>
                    <p className="text-md font-normal pr-[8rem] text-[rgb(118,118,118)] max-[935px]:text-base max-[935px]:text-left max-[935px]:pr-0 max-[935px]:text-sm">A short typography animation, which aims to explore the elements of personal branding and motion design.</p>

                     <div className="flex flex-row flex-wrap gap-3 pt-8 max-[935px]:py-0 max-[935px]:pt-8 max-[935px]:pb-8">
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-[935px]:text-[0.75rem] max-[935px]:py-[0.25rem] max-[935px]:px-3">TYPOGRAPHY</span>
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-[935px]:text-[0.75rem] max-[935px]:py-[0.25rem] max-[935px]:px-3">ANIMATION</span>
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-[935px]:text-[0.75rem] max-[935px]:py-[0.25rem] max-[935px]:px-3">BRANDING</span>
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-[935px]:text-[0.75rem] max-[935px]:py-[0.25rem] max-[935px]:px-3">MOTION DESIGN</span>
                    </div>
                </div>
            </div>
            <div className="fade-in flex-1 border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden max-[935px]:w-full transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.98]">
                <div className="w-[720px] h-[480px] max-[935px]:w-[720px] max-[935px]:h-[480px] max-md:w-full max-md:h-auto max-md:aspect-[3/2] overflow-hidden">
                    <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src={VIDEO_URLS.LOGO_ANIMATION} type="video/mp4"/>Your browser does not support the video tag.</video>
                </div>
            </div>
        </div>
        </Link>

        <br />
        
        {/* Modern Caveman */}
        <Link to={ROUTES.WORKS.CAVEMAN} className="group block">
        <div className="fade-container flex items-start gap-[15px] w-full max-[935px]:flex-col max-[935px]:flex-col-reverse">
            <div className="fade-in flex-1 flex items-start pt-[2rem] max-[935px]:w-full max-[935px]:pt-4 max-[935px]:justify-start max-[935px]:items-start">
                <div className="text-black transition-opacity">
                    <h2 className="text-3xl font-medium pb-[1rem] max-[935px]:text-xl max-[935px]:text-left">MODERN CAVEMAN</h2>
                    <p className="text-md font-normal pr-[8rem] text-[rgb(118,118,118)] max-[935px]:text-base max-[935px]:text-left max-[935px]:pr-0 max-[935px]:text-sm">A series of shadow-based explorations inspired by Plato&apos;s Allegory of the Cave, which prompts viewers to pause, reflect, and reconsider how they perceive reality.</p>

                     <div className="flex flex-row flex-wrap gap-3 pt-8 max-[935px]:py-0 max-[935px]:pt-8 max-[935px]:pb-8">
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-[935px]:text-[0.75rem] max-[935px]:py-[0.25rem] max-[935px]:px-3">CONCEPTUAL</span>
                        <span className="text-[0.9rem] font-normal text-[rgb(113,113,113)] py-1 px-4 rounded-[30px] bg-[#ececec] max-[935px]:text-[0.75rem] max-[935px]:py-[0.25rem] max-[935px]:px-3">3D RENDERING</span>
                    </div>
                </div>
            </div>
            <div className="fade-in flex-1 border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden max-[935px]:w-full transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.98]">
            <div className="w-[720px] h-[480px] max-[935px]:w-[720px] max-[935px]:h-[480px] max-md:w-full max-md:h-auto max-md:aspect-[3/2] overflow-hidden">
                <img className="block w-full h-full object-cover rounded-none" src={Caveman} />
            </div>
            </div>
        </div>
        </Link>
        
        <div className="flex justify-end pt-20 max-[935px]:pt-10">
          <Link to={ROUTES.WORKS.ROOT} className="flex items-center gap-2 text-[rgb(118,118,118)] text-lg max-[935px]:text-sm group">
            VIEW ALL PROJECTS
            <ArrowRight className="w-5 h-5 max-[935px]:w-4 max-[935px]:h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>
        </div>
    </section>

      <Footer theme='light' />
    </>
  );
};

export default Home;
