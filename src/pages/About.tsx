import { useEffect, useRef } from 'react';
import '../global.css';

import Footer from '../components/Footer';
import Library from '../components/Library';

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
    <div className="flex flex-col gap-8 max-[935px]:gap-6 min-[936px]:flex-row min-[936px]:items-start min-[936px]:gap-16">
      <h2 className="shrink-0 text-[1.5rem] max-[935px]:text-[1.2rem] [font-variation-settings:'wght'_700] text-[var(--color-text-muted)] min-[936px]:w-[min(28%,220px)]">
        {title}
      </h2>
      <ul className="m-0 flex min-w-0 flex-1 list-none flex-col gap-6 p-0 max-[935px]:gap-5">
        {entries.map((entry) => (
          <li
            key={`${entry.org}-${entry.period}`}
            className="flex flex-col mt-1 gap-1 min-[936px]:flex-row min-[936px]:items-start min-[936px]:justify-between min-[936px]:gap-8"
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
            <p className="m-0 shrink-0 text-sm [font-variation-settings:'wght'_400] text-[var(--color-text-muted)] min-[936px]:pt-0.5">
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
    // Trigger animations when component mounts
    const pElements = document.querySelectorAll<HTMLElement>('#about-page .description p');
    pElements.forEach((element, index) => {
      element.style.animationDelay = `${0.2 + (index * 0.2)}s`;
    });

    // Delay video playback
    setTimeout(() => {
      videoRef.current?.play();
    }, 600);
  }, []);

  return (
    <>
    <section id="about-hero" className="w-full bg-[#ffffff]">
        <div className="flex min-h-dvh w-full flex-col justify-center bg-[#ffffff] max-[935px]:pt-25">
        <div className="flex flex-1 items-center justify-center text-left bg-[#ffffff] p-5 rounded-[10px] max-w-[1440px] mx-auto w-full max-[935px]:flex-col max-[935px]:px-[var(--page-padding-x-mobile)]">
            <img 
              src={Profile} 
              className="max-w-[480px] max-h-[640px] mr-[8%] rounded-lg max-[935px]:mr-0 max-[935px]:w-full" 
              alt="Eric Ko" 
              draggable={false}
            /> 
        <div className="max-w-[1080px] max-[935px]:py-[10%] max-[935px]:px-0 max-[935px]:w-full">
            <p className="font-normal text-base opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.2s] max-[935px]:text-[0.9rem]">
              <strong>Eric Ko</strong> (b. 2004) is a multidisciplinary artist and designer currently pursuing a BFA in Graphic Design with a concentration in Computation, Technology, and Culture (CTC) at the Rhode Island School of Design (RISD). 
            </p>
            <br />
            <p className="font-normal text-base opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.4s] max-[935px]:text-[0.9rem]">
              Growing up in Seoul and spending four years in São Paulo, Brazil, taught him early that the same object, material, or gesture can mean something entirely different depending on one's context — and that gap is where he aspires to find the most interesting stories.
            </p>
            <br />
            <p className="font-normal text-base opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.4s] max-[935px]:text-[0.9rem]">
              Away from his studio, he explores with his 35mm film camera, and is slowly learning bossa nova.
            </p>
            <br />
            <p className="font-normal text-[0.9rem] opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.5s] max-[935px]:text-[0.8rem] max-[935px]:pb-8">
              <u>View CV (available upon request)</u>
            </p>
            {/*
            <div className="my-12 max-w-[760px] opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.5s] max-[935px]:my-10">
              <blockquote
                className="text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.03em] italic"
                style={{ fontFamily: 'var(--font-family-boska)' }}
              >
                Good design has the power to rouse people, not as an answer but as a question.
              </blockquote>
              <p className="mt-4 text-xs uppercase tracking-[0.2em]">Kenya Hara</p>
            </div>
            */}
            <div className="flex gap-2.5 pt-[3%] justify-start opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.8s] max-[935px]:mx-auto max-[935px]:gap-[5%] max-[935px]:py-[5%]">
                <a href="https://www.instagram.com/morebyko/" className="instagram" target="_blank" rel="noreferrer">
                <img src={InstagramIcon} alt="Instagram" className="max-w-[1.375rem] max-h-[1.375rem] max-[935px]:max-w-8 max-[935px]:max-h-8" />
                </a>
                <a href="https://www.linkedin.com/in/ericko26" className="linkedin" target="_blank" rel="noreferrer">
                <img src={LinkedinIcon} alt="LinkedIn" className="max-w-[1.375rem] max-h-[1.375rem] max-[935px]:max-w-8 max-[935px]:max-h-8" />
                </a>
                <a href="https://www.are.na/eric-ko/channels" className="arena" target="_blank" rel="noreferrer">
                <img src={ArenaIcon} alt="Arena" className="max-w-[2.375rem] max-h-[2.375rem] max-[935px]:max-w-13 max-[935px]:max-h-8" />
                </a>
                </div>
                
                <video 
                  ref={videoRef} 
                  className="max-w-[300px] max-h-[200px] w-full h-auto mt-5 rounded-lg opacity-0 bg-transparent animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.9s] max-[935px]:max-w-[200px] max-[935px]:max-h-[133px]" 
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
      <div className="flex w-full max-w-[1440px] flex-col gap-25 mx-auto px-5 pt-20 pb-20 max-[935px]:gap-15 max-[935px]:px-[var(--page-padding-x-mobile)]">
        <AboutInfoSection title="EDUCATION" entries={educationEntries} />
        {/*<AboutInfoSection title="EXPERIENCE" entries={experienceEntries} />*/}
      </div>
    </section>
    <Library />
    <Footer theme="light" />
    </>
  );
}

export default About;
