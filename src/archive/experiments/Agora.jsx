import React from 'react';
import '../../global.css';
import styles from '../../styles/works.module.css';

import Footer from '../../components/Footer';

import AgoraLayout from '../../assets/images/archive/agora/agora-layout.webp';

function Agora() {
  return (
    <>
    <section id="project-main" className={styles['project-main']}>
        <video className={styles['project-vid-ver']} src="https://res.cloudinary.com/db6ifdikq/video/upload/v1750039958/agora-full_kaej38.mp4" autoPlay loop muted playsInline controlsList="nodownload"> 
        Your browser does not support the video tag.
        </video>
        <div className={styles['project-info']}>
        <div className={styles['project-basics']}>
            <h1>Agora</h1>
            <br />
            <h2>2022</h2>
            <h3>Adobe Illustrator, <br /> After Effects</h3>
        </div>
        <div className={styles['project-intro']}>
            <h4>Agora, pronounced <i>Αγορά</i>, is a typeface concept that draws inspiration from the vibrant public forums of ancient Greece, where citizens exchanged knowledge and ideas on topics such as art, philosophy, and politics.</h4>
            <div className={styles['project-keywords']}>
                <span>TYPEFACE</span>
                <span>ANIMATION</span>
                <span>MOTION DESIGN</span>
            </div>
        </div>    
        </div>

    <section id="project-description" className={styles['project-description']}>
        <div className={styles['description']}>
        <div className={styles['description-img']}>
            <img src={AgoraLayout} alt="Agora Layout" className={styles['largeImage']}/>
        </div>
        <div className={styles['description-body']}>
            <h5>The communal spaces of Agora symbolized the free flow of information and the collective pursuit of insight. The typeface design shares a similar idea through its minimalistic design, characterized by simple variations in thickness. Its clean lines and geometric forms create alphabets that are both fundamental and universally accessible.</h5>
            <br />
            <h5>The accompanying animation illustrates the formation of knowledge, reflecting the dynamic exchange of ideas that once nourished ancient civilization in the agora.</h5>
        </div>
        </div>
    </section>

    <section id="credits" className={styles['project-credits']}>
        <div className={styles['credits-title']}>
            <h3>CREDITS</h3>
        </div>
        <div className={styles['credits-body']}>
            <h5>“Agora of Athens History – Ancient-Greece.org.” Ancient Greece, 23 June 2025, ancient-greece.org/history/the-agora-of-athens-history/.</h5>
            <br />
            <h5>Britannica Editors. "agora". Encyclopedia Britannica, 7 Jun. 2024, https://www.britannica.com/topic/agora. Accessed 8 November 2025.</h5>
        </div>
    </section>

    </section>
    
    <br />

    <Footer theme="light" />
    </>
  );
}

export default Agora;


