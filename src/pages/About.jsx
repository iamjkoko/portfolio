import React, { useEffect, useRef } from 'react';
import '../global.css';
import styles from '../styles/about.module.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Profile from '/profile-test.webp';
import InstagramIcon from '../assets/icons/instagram-black.png';
import LinkedinIcon from '../assets/icons/linkedin-black.png';

function About() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Trigger animations when component mounts
    const h6Elements = document.querySelectorAll('#about-page .description h6');
    h6Elements.forEach((element, index) => {
      element.style.animationDelay = `${0.2 + (index * 0.2)}s`;
    });

    // Delay video playback
    if (videoRef.current) {
      setTimeout(() => {
        videoRef.current.play();
      }, 600);
    }
  }, []);

  return (
    <>
    <Navbar theme="light"></Navbar>
    <section id="about-page" className={styles.aboutPage}>
        <div className={styles.aboutContainer}>
            <img src={Profile} className={styles.profileImage} alt="Eric Ko" draggable={false}/> 
        <div className={styles.description}>
            <h6><strong>Eric Ko</strong> (b. 2004) is a multidisciplinary artist and designer currently pursuing a BFA in Industrial and Product Design at the Rhode Island School of Design (RISD). Born and raised in Seoul, and having spent four years in São Paulo, Brazil, his works are shaped by his cultural roots and curiosity about the intersection of tradition, innovation, and sustainability.</h6>
            <br />
            <h6>Eric's creative practice spans both graphic and product design, as well as visual arts, with a focus on integrating unique narratives between the lines of aesthetics and functionality.</h6>
            <br />
            <h6>Outside of his studio, Eric enjoys capturing moments through his 35mm film camera, practicing bossa nova on his classic guitar, or watching his favorite soccer team play on TV.</h6>
            <br />
            <p><u>View CV (available upon request)</u></p>
            <div className={styles.socials}>
                <a href="https://www.instagram.com/morebyko/" className="instagram" target="_blank">
                <img src={InstagramIcon} alt="Instagram" />
                </a>
                <a href="https://www.linkedin.com/in/ericko26" className="linkedin" target="_blank">
                <img src={LinkedinIcon} alt="LinkedIn" />
                </a>
                </div>
                <video ref={videoRef} src="https://res.cloudinary.com/db6ifdikq/video/upload/v1760045865/signature-anim_zzvoov.mp4" className={styles.signature} muted playsInline controlsList="nodownload" draggable={false}> 
                Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </section>
    <br />
    <Footer theme="light" />
    </>
  );
}

export default About;


