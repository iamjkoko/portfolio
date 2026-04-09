import React, { useEffect } from 'react';
import '../../global.css';
import styles from '../../styles/works.module.css';

import Footer from '../../components/Footer';

import LightPainting1 from '../../assets/images/archive/light-painting/light-painting-1.webp';

import Inspo1 from '../../assets/images/archive/light-painting/inspo-1.webp';
import Inspo2 from '../../assets/images/archive/light-painting/inspo-2.webp';

function LightPainting(): React.JSX.Element {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div
      data-navbar-theme="dark"
      style={{ background: 'var(--color-background)', color: 'var(--color-text)' }}
    >
      <section id="project-main" className={styles['project-main']}>
      <img
        src={LightPainting1}
        alt="Light Painting"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '1280px',
          padding: '3.125rem 0'
        }}
      />
        <div className={styles['project-info']}>
        <div className={styles['project-basics']}>
            <h1>Untitled</h1>
            <br />
            <h2>2022</h2>
            <h3>Oil on canvas</h3>
            <p>16 x 22 in.</p>
        </div>
        <div className={styles['project-intro']}>
            <p>The following oil painting is a study of light and shadow, inspired by the works of Caravaggio and Joseph Wright. Set within a space where sunlight streams through windows, the piece captures the complex patterns of shadow cast across surfaces.</p>
            <br />
            <p>By placing focus on the contrast and tonal depth, the painting reflects an aesthetic exploration of how light sculpts form and creates an emotional atmosphere.</p>
            <div className={styles['project-keywords']}>
                <span>OIL PAINTING</span>
                <span>LIGHT & SHADOW</span>
            </div>
        </div>
        </div>
      </section>

      <section id="references" className={styles['references']}>
        <div className={styles['references-title']}>
          <h3>References</h3>
        </div>
        <div className={styles['references-img']}>
          <figure className={styles.figure}>
            <img src={Inspo2} alt="Inspo 1" />
            <figcaption className={styles.figcaption}>By Joseph Wright of Derby - europeana.eu, Public Domain, https://commons.wikimedia.org/w/index.php?curid=1292995</figcaption>
          </figure>
          <figure className={styles.figure}>
            <img src={Inspo1} alt="Inspo 2" />
            <figcaption className={styles.figcaption}>By Caravaggio - europeana.eu, Public Domain, https://commons.wikimedia.org/w/index.php?curid=1292995</figcaption>
          </figure>
        </div>
      </section>

      <br />

      <Footer theme="dark" />
    </div>
  );
}

export default LightPainting;
