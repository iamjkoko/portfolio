import '../global.css';
import styles from '../styles/works.module.css';
import { useRef } from 'react';

import Footer from '../components/Footer';
import Back from '../components/Back';
import { VIDEO_URLS } from '../constants/videos';
import useProjectInfoStagger from '../hooks/useProjectInfoStagger';

function Stamps() {
  const projectInfoRef = useRef<HTMLDivElement | null>(null);
  useProjectInfoStagger(projectInfoRef);

  return (
    <>
      <section id="project-main" className={styles['project-main']}>
        <div ref={projectInfoRef} className={styles['project-info']}>
          <div className={styles['project-basics']}>
            <Back />
            <h1>THE STAMP ARCHIVE</h1>
            <br />
            <h2>2026</h2>
            <h3>Python, React, Three.js</h3>
          </div>
          <div className={styles['project-content']}>
            <div className={styles['project-intro']}>
              <p>An online archive of my father's stamp collection, spanning hundreds of pieces from around the world. The project preserves each stamp's story through careful scanning and cataloging, presenting them with the warmth of a personal museum rather than a sterile database.</p>
              <br />
              <p>
                <a href="https://iamjkoko.github.io/stamp-gallery/" target="_blank" rel="noopener noreferrer" className="text-[#62abe5]">
                  Click to View
                </a>
              </p>
            </div>
          </div>
          <div className={styles['project-keywords']}>
            <span>FRONT-END</span>
            <span>PYTHON</span>
            <span>ARCHIVING</span>
          </div>
          <video className={styles['project-vid-hor']} src={VIDEO_URLS.STAMPS_DEMO_FULL} autoPlay loop muted playsInline controlsList="nodownload">
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section id="project-description" className={styles['project-description']}>
          <div className={styles['description']}>
            <div className={styles['description-title']}>
              <h3>OVERVIEW</h3>
            </div>
            <div className={styles['description-body']}>
              <p>My father used to collect stamps as he traveled the world in his youth, which was a practice he inherited from my grandfather. More than 40 years later, I discovered the stamp book in his room: a quiet inheritance spanning two generations, and a piece of my family's history I had not known to look for. This archive exists not simply to display the collection, but to cherish the memories and journeys it carries.</p>
            </div>
          </div>
        </section>


      <Footer theme="light" />
    </>
  );
}

export default Stamps;
