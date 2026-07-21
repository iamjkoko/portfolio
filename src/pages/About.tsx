import { useEffect, useRef } from 'react';
import '../global.css';

import Footer from '../components/Footer';
import LogoLoop from '../components/LogoLoop';
import ReactIcon from '../assets/icons/react.svg';
import TailwindIcon from '../assets/icons/tailwind.svg';
import FigmaIcon from '../assets/icons/figma.svg';
import BlenderIcon from '../assets/icons/blender.svg';
import CursorIcon from '../assets/icons/cursor.svg';
import PsIcon from '../assets/icons/ps.svg';
import AiIcon from '../assets/icons/ai.svg';
import AeIcon from '../assets/icons/ae.svg';
import PrIcon from '../assets/icons/pr.svg';
import LrcIcon from '../assets/icons/lrc.svg';
import TdIcon from '../assets/icons/td.svg';
import MidjourneyIcon from '../assets/icons/midjourney.svg';
import MagnificIcon from '../assets/icons/magnific.svg';

{/*
import Library from '../components/Library';
*/}

import Profile from '/profile-test.webp';

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

const stackLogos = [
  // Custom SVGs
  { src: ReactIcon, alt: 'React', href: 'https://react.dev' },
  { src: TailwindIcon, alt: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { src: FigmaIcon, alt: 'Figma', href: 'https://www.figma.com' },
  { src: BlenderIcon, alt: 'Blender', href: 'https://www.blender.org' },
  { src: CursorIcon, alt: 'Cursor', href: 'https://cursor.com' },
  { src: PsIcon, alt: 'Photoshop', href: 'https://www.adobe.com/products/photoshop.html' },
  { src: AiIcon, alt: 'Illustrator', href: 'https://www.adobe.com/products/illustrator.html' },
  { src: AeIcon, alt: 'After Effects', href: 'https://www.adobe.com/products/aftereffects.html' },
  { src: PrIcon, alt: 'Premiere Pro', href: 'https://www.adobe.com/products/premiere.html' },
  { src: LrcIcon, alt: 'Lightroom Classic', href: 'https://www.adobe.com/products/photoshop-lightroom-classic.html' },
  { src: TdIcon, alt: 'TouchDesigner', href: 'https://derivative.ca' },
  { src: MidjourneyIcon, alt: 'Midjourney', href: 'https://www.midjourney.com' },
  { src: MagnificIcon, alt: 'Magnific', href: 'https://magnific.ai' },
];

{/*
const experienceEntries: AboutSectionEntry[] = [
  {
    role: 'Brand & Research Intern',
    org: '1-1company',
    detail: 'Desk-researched museums in UK, USA, Europe for a branding project case study material.',
    period: 'Feb - Apr, 2022',
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
        <div className="max-w-[1080px] max-mobile:pt-[10%] max-mobile:px-0 max-mobile:w-full">
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
            <p className="font-normal text-[var(--color-text-muted)] text-[0.9rem] opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.5s] max-mobile:text-[0.8rem] max-mobile:pb-8 cursor-default">
              <u>View CV</u>
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
                <video 
                  ref={videoRef} 
                  className="max-w-[300px] max-h-[200px] w-full h-auto mt-5 rounded-lg opacity-0 bg-transparent animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.9s] max-mobile:max-w-[200px] max-mobile:max-h-[133px] max-mobile:mt-0 max-mobile:mb-0" 
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
        </div>
    </section>


    
    <section className="w-full bg-[var(--color-background)]">
      <div className="flex w-full max-w-[1440px] flex-col gap-25 mx-auto px-5 pt-5 pb-40 max-mobile:gap-15 max-mobile:px-[var(--page-padding-x-mobile)] max-mobile:pt-10 max-mobile:pb-20">
        <AboutInfoSection title="EDUCATION" entries={educationEntries} />
        {/*
        <AboutInfoSection title="EXPERIENCE" entries={experienceEntries} />
        */}
        <div className="flex flex-col gap-8 max-mobile:gap-6 mobile:flex-row mobile:items-center mobile:gap-16">
          <h2 className="shrink-0 text-[1.5rem] max-mobile:text-[1.2rem] [font-variation-settings:'wght'_700] text-[var(--color-text-muted)] mobile:w-[min(28%,220px)]">
            STACK
          </h2>
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <LogoLoop
              logos={stackLogos}
              speed={80}
              direction="left"
              logoHeight={36}
              gap={48}
              hoverSpeed={0}
              fadeOut
              fadeOutColor="var(--color-background)"
              ariaLabel="stack"
            />
          </div>
        </div>
      </div>
    </section>

    {/*
    <Library />
    */}

    <Footer theme="light" />
    </>
  );
}

export default About;
