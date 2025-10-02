import React from 'react';
import '../global.css';
import styles from '../styles/works.module.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Name from '../assets/images/works/logo/name.webp';

import Progress1 from '../assets/images/works/logo/progress-1.webp';
import Progress2 from '../assets/images/works/logo/progress-2.webp';

function Logo() {
  const themeStyles = {
    light: {
      background: 'white',
      color: 'black',
    },
    dark: {
      background: 'black',
      color: 'white',
    },
  };
  return (
    <div style={themeStyles["light"]}>
    <Navbar theme="light" />
    <section id="project-main" className={styles.projectMain}>
        <video className={styles['project-vid-hor']} src="https://res.cloudinary.com/db6ifdikq/video/upload/v1750039959/logo_n5druz.mp4" autoPlay loop muted playsInline controlsList="nodownload"> 
        Your browser does not support the video tag.
        </video>
        <div className={styles['project-info']}>
        <div className={styles['project-basics']}>
            <h1>Ko: Logo Animation</h1>
            <br />
            <h2>2025</h2>
            <h3>Adobe Illustrator, <br /> After Effects</h3>
        </div>
        <div className={styles['project-intro']}>
            <h4>A short typography animation, which aims to explore the elements of personal branding and motion design. The design combines textual elements of the artist's name in both the Korean and English language. </h4>
          </div>
        </div>

    <section id="project-description" className={styles['project-description']}>
        <div className={styles['description']}>
        <div className={styles['description-body']}>
            <h5>My Korean name, spelled 고정혁 (pronounced KO-JUNG-HYOUK), follows the naming tradition of my country. The family name, 고 (KO), is inherited from my father, and my given name, 정혁 (JUNG-HYOUK), consists of two syllables, which is a common structure in Korea.</h5>
        </div>
        <div className={styles['description-img']}>
            <img src={Name} alt="Name" />
        </div>
        <div className={styles['description-body']}>
            <h5>For this project, I was mostly interested in exploring the visual similarities between the characters of my name in the two languages. Particularly, I found that the letters "ㅈ" and "ㅇ" from "정" closely resemble the English letters "K" and "O". Building on this observation, I focused on creating a dynamic transtion in between the two versions of my name, while maintaining the consistent imagery to help viewers understand and follow the logical flow.</h5>
            <br />
            <h5>The spinning animation of the logo alludes to the visual analogy of the Korean and English names. As it rotates, the letter "ㅈ" becomes the letter "K", whilst the "ㅇ" and "O" remain visually identical, reinforcing the link between the characters.</h5>
        </div>
        </div>
        </section>

        <hr />

    <section id="progress" className={styles['progress']}>
        <div className={styles['progress-title']}>
            <h3>Progress: <strong>Creating the logo</strong></h3>
        </div>
        <div className={styles['progress-img']}>
            <img src={Progress1} alt="Progress 1" />
            <img src={Progress2} alt="Progress 2" />
        </div>
        <div className={styles['progress-vid']}>
            <video src="https://res.cloudinary.com/db6ifdikq/video/upload/v1750039959/logo-wip_fc1z63.mp4" autoPlay loop muted playsInline controlsList="nodownload">
            Your browser does not support the video tag.
            </video>
        </div>
    </section>

    </section>

    <Footer theme="light" />
    </div>
  );
}

export default Logo;


