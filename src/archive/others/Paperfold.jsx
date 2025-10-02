import React from 'react';
import '../../global.css';
import styles from '../../styles/works.module.css';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import Gallery from '../../components/Gallery';

import Paperfold1 from '../../assets/images/archive/paperfold/paperfold-1.webp';
import Paperfold2 from '../../assets/images/archive/paperfold/paperfold-2.webp';

function Paperfold() {
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
    { src: Paperfold1, alt: 'Paperfold 1' },
    { src: Paperfold2, alt: 'Paperfold 2' },
  ];
  return (
    <div style={themeStyles["light"]}>
      <Navbar theme="light" />
      <section id="project-main" className={styles.projectMain}>
      <Gallery images={imageList} />
        <div className={styles['project-info']}>
        <div className={styles['project-basics']}>
            <h1>Paperfold</h1>
            <br />
            <h2>2024</h2>
            <h3>Paper</h3>
            <h4>9 x 16 x 10 in.</h4>
        </div>
        <div className={styles['project-intro']}>
            <h4>Paperfold is a series of experimental sculptures that investigate mathematical and geometric forms through the art of origami. Using different folding techniques, the project transforms flat sheets of paper into complex three-dimensional structures composed of repeating angular modules.</h4>
            <br />
            <h4>The project explores the intersection of art and mathematics, creating a visual language that transcends traditional boundaries. By manipulating the folding process, the artist creates a series of dynamic forms that challenge the viewer's perception of space and geometry.</h4>
            <br />
            <h4>The project allows viewers to explore the beauty of mathematical forms and the creative process of folding paper, inspiring a deeper appreciation for the interplay between art and science.</h4>
        </div>
        </div>
      </section>

      <Footer theme="light" />
    </div>
  );
}

export default Paperfold;


