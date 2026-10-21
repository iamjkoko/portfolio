import { useRef } from 'react';
import '../global.css';
import styles from '../styles/works.module.css';

import Back from '../components/Back';
import Footer from '../components/Footer';
import useProjectInfoStagger from '../hooks/useProjectInfoStagger';
import { VIDEO_URLS } from '../constants/videos';

import Cover from '../assets/images/works/andante/main-cover.webp';
import Uppercase from '../assets/images/works/andante/uppercase-full.webp';
import Lowercase from '../assets/images/works/andante/lowercase-full.webp';
import Detail from '../assets/images/works/andante/closeup-detail.webp';
import Experiments from '../assets/images/works/andante/experiments-01.webp';

function Andante() {
  const projectInfoRef = useRef<HTMLDivElement | null>(null);
  useProjectInfoStagger(projectInfoRef);

  return (
    <>
      <section id="project-main" className={styles['project-main']}>
        <div ref={projectInfoRef} className={styles['project-info']}>
          <div className={styles['project-basics']}>
            <Back />
            <h1>Andante</h1>
            <br />
            <h2>2026</h2>
            <h3>Adobe Illustrator, InDesign, After Effects</h3>
          </div>
          <div className={styles['project-intro']}>
            <p>Andante, pronounced <i>ahn-DAHN-tay</i>, is a typeface concept inspired by the metal fences at the RISD Design Center. A grid derived from their architectural structure becomes the foundation for a geometric alphabet, translating an everyday detail of the built environment into letterforms.</p>
          </div>
          <div className={styles['project-keywords']}>
            <span>TYPOGRAPHY</span>
            <span>TYPEFACE</span>
          </div>
          <img className={styles['project-img']} src={Cover} alt="Andante lettering over a black-and-white photograph of concrete architecture" />
        </div>
      </section>

      <section id="project-description" className={styles['project-description']}>
        <div className={styles['description']}>
          <div className={styles['description-body']}>
            <p>The letterforms brought to mind Tadao Ando’s exposed concrete structures: their surfaces, seams, and quiet geometric presence. The name Andante connects this architectural influence to the slow, calm pace of walking through a building, taking time to notice its details and appreciate it in person.
            </p>
          </div>
          <div className={styles['description-img']}>
            <img src={Uppercase} alt="Andante uppercase alphabet specimen, A through Z" className="max-w-[1200px]" loading="lazy" />
          </div>
          <div className={styles['description-img']}>
            <img src={Lowercase} alt="Andante lowercase alphabet specimen, a through z" className="max-w-[1200px]" loading="lazy" />
          </div>
        </div>

        <div className={styles['description']}>
          <div className={styles['description-title']}>
            <h3>CONSTRUCTION & EXPLORATION</h3>
          </div>
          <div className={styles['description-body']}>
            <p>The fence reference provides a shared grid for the uppercase and lowercase forms. The construction studies and experiments explore how geometric elements can be arranged within that system to shape individual letters.</p>
          </div>
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 items-start gap-3 pt-10 pb-2 max-mobile:gap-2 max-mobile:pt-4">
            <video className="block h-auto w-full min-w-0 rounded-lg" autoPlay loop muted playsInline preload="metadata" aria-label="Andante grid construction animation 1">
              <source src={VIDEO_URLS.ANDANTE_GRID_01} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <video className="block h-auto w-full min-w-0 rounded-lg" autoPlay loop muted playsInline preload="metadata" aria-label="Andante grid construction animation 2">
              <source src={VIDEO_URLS.ANDANTE_GRID_02} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={styles['description-img']}>
            <img src={Detail} alt="Uppercase A and lowercase a shown over Andante’s construction grid" className="max-w-[1200px]" loading="lazy" />
          </div>
          <div className={styles['description-img']}>
            <img src={Experiments} alt="Six geometric letterform construction experiments for Andante" className="max-w-[1200px]" loading="lazy" />
          </div>
        </div>
      </section>

      <Footer theme="light" />
    </>
  );
}

export default Andante;
