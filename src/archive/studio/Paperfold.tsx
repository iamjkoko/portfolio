import React, { useRef } from 'react';
import '../../global.css';
import styles from '../../styles/works.module.css';

import Footer from '../../components/Footer';
import useProjectInfoStagger from '../../hooks/useProjectInfoStagger';

import Gallery from '../../components/Gallery';

import Paperfold1 from '../../assets/images/archive/paperfold/paperfold-1.webp';
import Paperfold2 from '../../assets/images/archive/paperfold/paperfold-2.webp';

function Paperfold(): React.JSX.Element {
  const projectInfoRef = useRef<HTMLDivElement | null>(null);
  useProjectInfoStagger(projectInfoRef);

  const imageList: { src: string; alt: string }[] = [
    { src: Paperfold1, alt: 'Paperfold 1' },
    { src: Paperfold2, alt: 'Paperfold 2' },
  ];
  return (
    <>
      <section id="project-main" className={styles['project-main']}>
        <div ref={projectInfoRef} className={styles['project-info']}>
          <div className={styles['project-basics']}>
            <h1>Paperfold</h1>
            <br />
            <h2>2024</h2>
            <h3>Paper</h3>
            <p>9 x 16 x 10 in.</p>
          </div>
          <div className={styles['project-content']}>
            <div className={styles['project-intro']}>
              <p>Paperfold is an experimental sculpture that investigates into the mathematical and geometric forms through the art of origami. Using different folding techniques, the project transforms flat sheets of paper into complex three-dimensional structures composed of repeating angular modules.</p>
            </div>
            <div className={styles['project-keywords']}>
                <span>SCULPTURE</span>
                <span>GEOMETRY</span>
                <span>ORIGAMI</span>
            </div>
          </div>
          <div className={styles['project-gallery']}>
            <Gallery images={imageList} />
          </div>
        </div>
      </section>

      <br />
      
      <Footer theme="light" />
    </>
  );
}

export default Paperfold;
