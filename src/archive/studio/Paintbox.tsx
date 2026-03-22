import React from 'react';
import '../../global.css';
import styles from '../../styles/works.module.css';

import Footer from '../../components/Footer';

import Gallery from '../../components/Gallery';

import Paintbox1 from '../../assets/images/archive/paintbox/paintbox-1.webp';
import Paintbox2 from '../../assets/images/archive/paintbox/paintbox-2.webp';

function Paintbox(): React.JSX.Element {
  const imageList: { src: string; alt: string }[] = [
    { src: Paintbox1, alt: 'Paintbox 1' },
    { src: Paintbox2, alt: 'Paintbox 2' },
  ];
  return (
    <>
      <section id="project-main" className={styles['project-main']}>
      <Gallery images={imageList} />
        <div className={styles['project-info']}>
        <div className={styles['project-basics']}>
            <h1>Paintbox</h1>
            <br />
            <h2>2024</h2>
            <h3>Cardboard</h3>
        </div>
        <div className={styles['project-intro']}>
            <p>Paintbox is a multifunctional tool that combines both <strong>practicality and functionality</strong>. Designed to store essential painting materials such as brushes, paints, and palettes, the box transforms into a <strong>self-supporting easel</strong>. The piece is built entirely from cardboard <strong>without the use of glue or tape</strong>, which showcases the possibilities of engineering and design through simple yet effective construction methods.</p>
            <br />
            <p>The <strong>complete absence of adhesives</strong>, which is the main focus of the project, not only emphasizes sustainability but also highlights the creative problem-solving and craftsmanship involved in its assembly. Through this process, the work becomes more than just a functional object—it represents the power of design in which utilizes eco-friendly materials.</p>
            <br />
            <p>All in all, the project allows viewers to <strong>rethink everyday materials</strong> and discover the <strong>potential for innovation in even the simplest of tools</strong>, inspiring creativity in both art and design.</p>
            <div className={styles['project-keywords']}>
                <span>DESIGN & ENGINEERING</span>
                <span>MATERIALITY</span>
                <span>SUSTAINABILITY</span>
            </div>
        </div>
        </div>

      </section>

      <br />

      <Footer theme="light" />
    </>
  );
}

export default Paintbox;
