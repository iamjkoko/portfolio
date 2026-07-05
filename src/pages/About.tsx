import { useEffect, useRef } from 'react';
import '../global.css';

import Footer from '../components/Footer';
import LogoLoop from '../components/LogoLoop';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiThreedotjs,
  SiFramer,
  SiGreensock,
  SiFigma,
  SiBlender,
  SiProcessingfoundation,
  SiArduino,
} from 'react-icons/si';

{/*
import Library from '../components/Library';
*/}

import { EXTERNAL_LINKS } from '../constants/routes';
import Profile from '/profile-test.webp';
import InstagramIcon from '../assets/icons/instagram-black.webp';
import LinkedinIcon from '../assets/icons/linkedin-black.webp';
import ArenaIcon from '../assets/icons/are.na-black.webp';

import Signature from '../assets/videos/signature.mp4';

type AboutSectionEntry = {
  role: string;
  org: string;
  detail?: string;
  period: string;
};

const educationEntries: AboutSectionEntry[] = [
  {
    role: 'BFA Candidate',
    org: 'Rhode Island School of Design',
    detail: 'Graphic Design · Computation, Technology, and Culture (CTC)',
    period: '2023 — Present',
  },
];

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiVite />, title: 'Vite', href: 'https://vite.dev' },
  { node: <SiThreedotjs />, title: 'Three.js', href: 'https://threejs.org' },
  { node: <SiFramer />, title: 'Framer Motion', href: 'https://motion.dev' },
  { node: <SiGreensock />, title: 'GSAP', href: 'https://gsap.com' },
  { node: <SiFigma />, title: 'Figma', href: 'https://www.figma.com' },
  { node: <SiBlender />, title: 'Blender', href: 'https://www.blender.org' },
  { node: <SiProcessingfoundation />, title: 'Processing', href: 'https://processing.org' },
  { node: <SiArduino />, title: 'Arduino', href: 'https://www.arduino.cc' },
];

{/*
const experienceEntries: AboutSectionEntry[] = [
  {
    role: '-',
    org: '-',
    detail: '-',
    period: '-',
  },
];
*/}

function AboutInfoSection({
  title,
  entries,
}: {
  title: string;
  entries: AboutSectionEntry[];
}) {
  return (
    <div className="flex flex-col gap-8 max-mobile:gap-6 mobile:flex-row mobile:items-start mobile:gap-16">
      <h2 className="shrink-0 text-[1.5rem] max-mobile:text-[1.2rem] [font-variation-settings:'wght'_700] text-[var(--color-text-muted)] mobile:w-[min(28%,220px)]">
        {title}
      </h2>
      <ul className="m-0 flex min-w-0 flex-1 list-none flex-col gap-6 p-0 max-mobile:gap-5">
        {entries.map((entry) => (
          <li
            key={`${entry.org}-${entry.period}`}
            className="flex flex-col mt-1 gap-1 mobile:flex-row mobile:items-start mobile:justify-between mobile:gap-8"
          >
            <div className="min-w-0">
              <p className="m-0 text-base leading-snug [font-variation-settings:'wght'_550] text-[var(--color-text)]">
                {entry.role}
              </p>
              <p className="m-0 mt-1 text-sm leading-relaxed [font-variation-settings:'wght'_400] text-[var(--color-text)]">
                {entry.org}
              </p>
              {entry.detail ? (
                <p className="m-0 mt-0.5 text-sm leading-relaxed [font-variation-settings:'wght'_400] text-[var(--color-keyword-text)]">
                  {entry.detail}
                </p>
              ) : null}
            </div>
            <p className="m-0 shrink-0 text-sm [font-variation-settings:'wght'_400] text-[var(--color-text-muted)] mobile:pt-0.5">
              {entry.period}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function About() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Delay video playback until the fade-in has mostly settled.
    const timeoutId = window.setTimeout(() => {
      videoRef.current?.play();
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
    <section id="about-hero" className="w-full bg-[#ffffff]">
        <div className="flex min-h-dvh w-full flex-col justify-center bg-[#ffffff] max-mobile:pt-25">
        <div className="flex flex-1 items-center justify-center text-left bg-[#ffffff] p-5 rounded-[10px] max-w-[1440px] mx-auto w-full max-mobile:flex-col max-mobile:px-[var(--page-padding-x-mobile)]">
            <img 
              src={Profile} 
              className="max-w-[480px] max-h-[640px] mr-[8%] rounded-lg max-mobile:mr-0 max-mobile:w-full" 
              alt="Eric Ko" 
              draggable={false}
            /> 
        <div className="max-w-[1080px] max-mobile:py-[10%] max-mobile:px-0 max-mobile:w-full">
            <p className="font-normal text-base opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.2s] max-mobile:text-[0.9rem]">
              <strong>Eric Ko</strong> (b. 2004) is a multidisciplinary artist and designer currently pursuing a BFA in Graphic Design with a concentration in Computation, Technology, and Culture (CTC) at the Rhode Island School of Design (RISD). 
            </p>
            <br />
            <p className="font-normal text-base opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.4s] max-mobile:text-[0.9rem]">
              Growing up in Seoul and spending four years in São Paulo, Brazil, taught him early that the same object, material, or gesture can mean something entirely different depending on one's context — and that gap is where he aspires to find the most interesting stories.
            </p>
            <br />
            <p className="font-normal text-base opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.4s] max-mobile:text-[0.9rem]">
              Away from his studio, he explores with his 35mm film camera, and is slowly learning bossa nova.
            </p>
            <br />
            <p className="font-normal text-[0.9rem] opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.5s] max-mobile:text-[0.8rem] max-mobile:pb-8">
              <u>View CV (available upon request)</u>
            </p>
            {/*
            <div className="my-12 max-w-[760px] opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.5s] max-mobile:my-10">
              <blockquote
                className="text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.03em] italic"
                style={{ fontFamily: 'var(--font-family-boska)' }}
              >
                Good design has the power to rouse people, not as an answer but as a question.
              </blockquote>
              <p className="mt-4 text-xs uppercase tracking-[0.2em]">Kenya Hara</p>
            </div>
            */}
            <div className="flex gap-2.5 pt-[3%] justify-start opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.8s] max-mobile:mx-auto max-mobile:gap-[5%] max-mobile:py-[5%]">
                <a href={EXTERNAL_LINKS.INSTAGRAM} className="instagram" target="_blank" rel="noopener noreferrer">
                <img src={InstagramIcon} alt="Instagram" className="max-w-[1.375rem] max-h-[1.375rem] max-mobile:max-w-8 max-mobile:max-h-8" />
                </a>
                <a href={EXTERNAL_LINKS.LINKEDIN} className="linkedin" target="_blank" rel="noopener noreferrer">
                <img src={LinkedinIcon} alt="LinkedIn" className="max-w-[1.375rem] max-h-[1.375rem] max-mobile:max-w-8 max-mobile:max-h-8" />
                </a>
                <a href={EXTERNAL_LINKS.ARENA} className="arena" target="_blank" rel="noopener noreferrer">
                <img src={ArenaIcon} alt="Arena" className="max-w-[2.375rem] max-h-[2.375rem] max-mobile:max-w-13 max-mobile:max-h-8" />
                </a>
                </div>
                
                <video 
                  ref={videoRef} 
                  className="max-w-[300px] max-h-[200px] w-full h-auto mt-5 rounded-lg opacity-0 bg-transparent animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.9s] max-mobile:max-w-[200px] max-mobile:max-h-[133px]" 
                  muted 
                  playsInline 
                  controlsList="nodownload" 
                  draggable={false}
                > 
                  <source src={Signature} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
            </div>
        </div>
        </div>
    </section>


    
    <section className="w-full bg-[var(--color-background)]">
      <div className="flex w-full max-w-[1440px] flex-col gap-25 mx-auto px-5 pt-5 pb-40 max-mobile:gap-15 max-mobile:px-[var(--page-padding-x-mobile)] max-mobile:pt-10 max-mobile:pb-20">
        <AboutInfoSection title="EDUCATION" entries={educationEntries} />
        {/*<AboutInfoSection title="EXPERIENCE" entries={experienceEntries} />*/}
        <div className="flex flex-col gap-8 max-mobile:gap-6 mobile:flex-row mobile:items-center mobile:gap-16">
          <h2 className="shrink-0 text-[1.5rem] max-mobile:text-[1.2rem] [font-variation-settings:'wght'_700] text-[var(--color-text-muted)] mobile:w-[min(28%,220px)]">
            TOOLS
          </h2>
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={36}
              gap={48}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="var(--color-background)"
              ariaLabel="Tools and technologies"
            />
          </div>
        </div>
      </div>
    </section>
    {/*
    Library is temporarily hidden
    <Library />
    */}
    <Footer theme="light" />
    </>
  );
}

export default About;
