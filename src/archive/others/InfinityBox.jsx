import React from 'react';
import '../../global.css';
import styles from '../../styles/works.module.css';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import Gallery from '../../components/Gallery';

import InfinityBox1 from '../../assets/images/archive/infinity-box/infinity-box-1.webp';
import InfinityBox2 from '../../assets/images/archive/infinity-box/infinity-box-2.webp';

function InfinityBox() {
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
  const imageList = [
    { src: InfinityBox1, alt: 'Infinity Box 1' },
    { src: InfinityBox2, alt: 'Infinity Box 2' },
  ];
  return (
    <div style={themeStyles["light"]}>
      <Navbar theme="light" />
      <section id="project-main" className={styles.projectMain}>
      <Gallery images={imageList} />
        <div className={styles['project-info']}>
        <div className={styles['project-basics']}>
            <h1>Infinity Box</h1>
            <br />
            <h2>2025</h2>
            <h3>Cardboard, Reflective Sheet</h3>
            <h4>15 x 15 x 15 in.</h4>
        </div>
        <div className={styles['project-intro']}>
            <h4>Infinity Box is an attempt on exploring the <strong>boundless and cyclical nature of infinity</strong>, using cardboard lined with reflective surfaces. Each side of the box serves to mirror the other, creating an <strong>endless set of reflections</strong> that extend far beyond the physical constraints of the object.</h4>
            <br />
            <h4>Inside the box, a drawing of four Fibonacci sequences is placed to form a circle, which alludes to the concept of boundlessness and mathematical harmony. The Fibonacci spiral, often associated with growth and continuity, resonates with the overarching idea of infinity.</h4>
            <br />
            <h4>The project invites viewers to consider the <strong>relationships between perception, mathematics and the world around us</strong>, challenging the boundaries of what is tangible and what is infinite.</h4>
        </div>
        </div>
      </section>

      <Footer theme="light" />
    </div>
  );
}

export default InfinityBox;


