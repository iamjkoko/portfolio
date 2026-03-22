import { useEffect, useRef } from 'react';
import '../global.css';

import Footer from '../components/Footer';

import Profile from '/profile-test.webp';
import InstagramIcon from '../assets/icons/instagram-black.webp';
import LinkedinIcon from '../assets/icons/linkedin-black.webp';
import Signature from '../assets/videos/signature.mp4';

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
    <section id="about-page" className="flex flex-col min-h-screen justify-center mx-auto w-full bg-white max-[935px]:mt-[10%]">
        <div className="flex items-center justify-center text-left bg-white p-5 rounded-[10px] flex-1 max-w-[1440px] mx-auto max-[935px]:flex-col">
            <img 
              src={Profile} 
              className="max-w-[480px] max-h-[640px] mr-[8%] rounded-lg max-[935px]:mr-0 max-[935px]:w-full" 
              alt="Eric Ko" 
              draggable={false}
            /> 
        <div className="max-w-[1080px] max-[935px]:py-[10%] max-[935px]:px-[4%] max-[935px]:w-full">
            <p className="font-normal text-base opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.2s] max-[935px]:text-[0.9rem]">
              <strong>Eric Ko</strong> (b. 2004) is a multidisciplinary artist and designer currently pursuing a BFA in Industrial and Product Design at the Rhode Island School of Design (RISD). Born and raised in Seoul, and having spent four years in São Paulo, Brazil, his works are shaped by his cultural roots and curiosity about the intersection of tradition, innovation, and sustainability.
            </p>
            <br />
            <p className="font-normal text-base opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.3s] max-[935px]:text-[0.9rem]">
              Eric&apos;s creative practice spans both graphic and product design, as well as visual arts, with a focus on integrating unique narratives between the lines of aesthetics and functionality.
            </p>
            <br />
            <p className="font-normal text-base opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.4s] max-[935px]:text-[0.9rem]">
              Outside of the studio, Eric enjoys exploring with his 35mm film camera, studying bossa nova on his classical guitar, or watching his favorite soccer team play on TV.
            </p>
            <br />
            <p className="font-normal text-[0.9rem] opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.5s] max-[935px]:text-[0.8rem]">
              <u>View CV (available upon request)</u>
            </p>
            <div className="flex gap-2.5 pt-[3%] justify-start opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.6s] max-[935px]:gap-[5%] max-[935px]:py-[15%] max-[935px]:mx-auto">
                <a href="https://www.instagram.com/morebyko/" className="instagram" target="_blank" rel="noreferrer">
                <img src={InstagramIcon} alt="Instagram" className="max-w-[1.375rem] max-h-[1.375rem] max-[935px]:max-w-8 max-[935px]:max-h-8" />
                </a>
                <a href="https://www.linkedin.com/in/ericko26" className="linkedin" target="_blank" rel="noreferrer">
                <img src={LinkedinIcon} alt="LinkedIn" className="max-w-[1.375rem] max-h-[1.375rem] max-[935px]:max-w-8 max-[935px]:max-h-8" />
                </a>
                </div>
                <video 
                  ref={videoRef} 
                  src={Signature} 
                  className="max-w-[300px] max-h-[200px] w-full h-auto mt-5 rounded-lg opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] [animation-delay:0.7s]" 
                  muted 
                  playsInline 
                  controlsList="nodownload" 
                  draggable={false}
                > 
                Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </section>
    <Footer theme="light" />
    </>
  );
}

export default About;
