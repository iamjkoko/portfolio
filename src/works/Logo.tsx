import '../global.css';
import styles from '../styles/works.module.css';

import Footer from '../components/Footer';
import { VIDEO_URLS } from '../constants/videos';

import LogoStc from '../assets/videos/logo-stc.mp4';

import Progress1 from '../assets/images/works/logo/progress-1.webp';
import Progress2 from '../assets/images/works/logo/progress-2.webp';

function Logo() {
  return (
    <>
      <section id="project-main" className={styles['project-main']}>
        <video className={styles['project-vid-hor']} src={VIDEO_URLS.LOGO_ANIMATION} autoPlay loop muted playsInline controlsList="nodownload">
          Your browser does not support the video tag.
        </video>
        <div className={styles['project-info']}>
          <div className={styles['project-basics']}>
            <h1>Ko: Logo Animation</h1>
            <br />
            <h2>2025</h2>
            <h3>Adobe Illustrator, <br /> After Effects</h3>
          </div>
          <div className={styles['project-content']}>
            <div className={styles['project-intro']}>
              <p>A short typography animation, which aims to explore the elements of personal branding and motion design. The design combines textual elements of the artist's name in both the Korean and English language. </p>
            </div>
            <div className={styles['project-keywords']}>
              <span>TYPOGRAPHY</span>
              <span>ANIMATION</span>
              <span>BRANDING</span>
              <span>MOTION DESIGN</span>
            </div>
          </div>
        </div>

        <section id="project-description" className={styles['project-description']}>
          <div className={styles['description']}>
            <div className={styles['description-title']}>
              <h3>OVERVIEW</h3>
            </div>
            <div className={styles['description-body']}>
              <p>My Korean name, spelled 고정혁 (pronounced KO-JUNG-HYOUK), follows the naming tradition of my country. The family name, 고 (KO), is inherited from my father, and my given name, 정혁 (JUNG-HYOUK), consists of two syllables, which is a common structure in Korea.</p>
            </div>
            <div className={styles['description-vid']}>
              <video src={LogoStc} autoPlay muted playsInline controlsList="nodownload">
                Your browser does not support the video tag.
              </video>
            </div>
            <div className={styles['description-body']}>
              <p>For this project, I was mostly interested in exploring the visual similarities between the characters of my name in the two languages. Particularly, I found that the letters "ㅈ" and "ㅇ" from "정" closely resemble the English letters "K" and "O". Building on this observation, I focused on creating a dynamic transtion in between the two versions of my name, while maintaining the consistent imagery to help viewers understand and follow the logical flow.</p>
              <br />
              <p>The spinning animation of the logo alludes to the visual analogy of the Korean and English names. As it rotates, the letter "ㅈ" becomes the letter "K", whilst the "ㅇ" and "O" remain visually identical, reinforcing the link between the characters.</p>
            </div>
          </div>
        </section>

        <section id="progress" className={styles['progress']}>
          <div className={styles['progress-img']}>
            <img src={Progress1} alt="Progress 1" />
            <img src={Progress2} alt="Progress 2" />
          </div>
          <div className={styles['progress-vid']}>
            <video src={VIDEO_URLS.LOGO_WIP} autoPlay loop muted playsInline controlsList="nodownload">
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

      </section>

      <br />

      <Footer theme="light" />
    </>
  );
}

export default Logo;
