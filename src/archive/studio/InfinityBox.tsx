import React, { useRef } from 'react';
import '../../global.css';
import styles from '../../styles/works.module.css';

import Footer from '../../components/Footer';
import useProjectInfoStagger from '../../hooks/useProjectInfoStagger';

import Gallery from '../../components/Gallery';

import InfinityBox1 from '../../assets/images/archive/infinity-box/infinity-box-1.webp';
import InfinityBox2 from '../../assets/images/archive/infinity-box/infinity-box-2.webp';

function InfinityBox(): React.JSX.Element {
  const projectInfoRef = useRef<HTMLDivElement | null>(null);
  useProjectInfoStagger(projectInfoRef);

  const imageList: { src: string; alt: string }[] = [
    { src: InfinityBox1, alt: 'Infinity Box 1' },
    { src: InfinityBox2, alt: 'Infinity Box 2' },
  ];
  return (
    <>
      <section id="project-main" className={styles['project-main']}>
        <div ref={projectInfoRef} className={styles['project-info']}>
          <div className={styles['project-basics']}>
            <h1>Infinity Box</h1>
            <br />
            <h2>2025</h2>
            <h3>Cardboard, Reflective Sheet</h3>
            <p>15 x 15 x 15 in.</p>
          </div>
          <div className={styles['project-content']}>
            <div className={styles['project-intro']}>
              <p>Infinity Box is an attempt on exploring the <strong>boundless and cyclical nature of infinity</strong>, using cardboard lined with reflective surfaces. Each side of the box serves to mirror the other, creating an <strong>endless set of reflections</strong> that extend far beyond the physical constraints of the object.</p>
              <br />
              <p>Inside the box, a drawing of four Fibonacci sequences is placed to form a circle, which alludes to the concept of boundlessness and mathematical harmony. The Fibonacci spiral, often associated with growth and continuity, resonates with the overarching idea of infinity.</p>
              <br />
              <p>The project invites viewers to consider the <strong>relationships between perception, mathematics and the world around us</strong>, challenging the boundaries of what is tangible and what is infinite.</p>
            </div>
            <div className={styles['project-keywords']}>
                <span>INSTALLATION</span>
                <span>GEOMETRY</span>
                <span>MATERIALITY</span>
            </div>
          </div>
        </div>
        <Gallery images={imageList} />
      </section>

      <br />

      <Footer theme="light" />
    </>
  );
}

export default InfinityBox;
