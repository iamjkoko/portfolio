import React from 'react';
import '../../global.css';
import styles from '../../styles/works.module.css';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import Gallery from '../../components/Gallery';

import Cheso1 from '../../assets/images/archive/cheso/cheso-1.webp';
import Cheso2 from '../../assets/images/archive/cheso/cheso-2.webp';
import Cheso3 from '../../assets/images/archive/cheso/cheso-3.webp';
import Cheso4 from '../../assets/images/archive/cheso/cheso-4.webp';
import Cheso5 from '../../assets/images/archive/cheso/cheso-5.webp';
import Cheso6 from '../../assets/images/archive/cheso/cheso-6.webp';
import Cheso7 from '../../assets/images/archive/cheso/cheso-7.webp';
import Cheso8 from '../../assets/images/archive/cheso/cheso-8.webp';
import Cheso9 from '../../assets/images/archive/cheso/cheso-9.webp';

import ChesoConcept1 from '../../assets/images/archive/cheso/cheso-t-1.webp';
import ChesoConcept2 from '../../assets/images/archive/cheso/cheso-t-2.webp';

function Cheso() {
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
    { src: Cheso1, alt: 'Cheso 1' },
    { src: Cheso2, alt: 'Cheso 2' },
    { src: Cheso3, alt: 'Cheso 3' },
    { src: Cheso4, alt: 'Cheso 4' },
    { src: Cheso5, alt: 'Cheso 5' },
    { src: Cheso6, alt: 'Cheso 6' },
    { src: Cheso7, alt: 'Cheso 7' },
    { src: Cheso8, alt: 'Cheso 8' },
    { src: Cheso9, alt: 'Cheso 9' },
  ];
  return (
    <div style={themeStyles["light"]}>
      <Navbar theme="light" />
      <section id="project-main" className={styles.projectMain}>
        <div className="cheso-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          justifyContent: 'center',
          margin: '0 auto',
          overflow: 'hidden',
          padding: '100px 30px 20px',
        }}>
          {imageList.map((img, i) => (
            <div className="cheso-cont" key={i}
            style={{
              overflow: 'hidden',
              maxWidth: '410px',
              maxHeight: '280px',
              width: '100%',
              height: 'auto',
            }}>
              <img src={img.src} alt={img.alt} 
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
              />
            </div>
          ))}
        </div>
        <div className={styles['project-info']}>
        <div className={styles['project-basics']}>
            <h1>Cheso</h1>
            <br />
            <h2>2022</h2>
            <h3>Vegetables, <br />Rice-based Clay</h3>
        </div>
        <div className={styles['project-intro']}>
            <h4>Cheso (Korean: 채소) embodies the concept of <strong>recyclability</strong> and a <strong>return to nature</strong>. Crafted entirely from eco-friendly materials such as vegetables and rice-based clay, these artifacts blend <strong>functionality</strong> and <strong>sustainability</strong>.</h4>
            <h4>Designed as vessels and decorative items, each piece carries a dual purpose: to serve in daily life and to symbolize the human interconnectedness with the natural world.</h4>
            <br />
            <h4>After fulfilling their purpose, the items are designed to "return to nature" through natural decomposition, which leaves no trace and therefore reinforces the <strong>cyclical relationship between humans and the environment</strong>. Cheso not only challenges the boundaries of traditional material usage but also reimagines how art and utility can coexist in an environmentally conscious way. It invites viewers to reflect on impermanence, sustainability, and the beauty of embracing organic forms in design.</h4>
        </div>
        </div>
      </section>
      <section id="progress" className={styles['progress']}>
        <div className={styles['progress-img']}>
          <img src={ChesoConcept1} alt="Cheso Concept 1" />
          <img src={ChesoConcept2} alt="Cheso Concept 2" />
        </div>
      </section>

      <br />
      
      <Footer theme="light" />
    </div>
  );
}

export default Cheso;


