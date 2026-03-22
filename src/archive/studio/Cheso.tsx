import React from 'react';
import '../../global.css';
import styles from '../../styles/works.module.css';

import Footer from '../../components/Footer';

import ChesoFull from '../../assets/images/archive/cheso/cheso-full.webp';
import ChesoConcept1 from '../../assets/images/archive/cheso/cheso-cp1.webp';
import ChesoConcept2 from '../../assets/images/archive/cheso/cheso-cp2.webp';

function Cheso(): React.JSX.Element {
  return (
    <>
      <section id="project-main" className={styles['project-main']}>
        <img className={styles['project-img']} src={ChesoFull} alt="Cheso Full" />
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
            <div className={styles['project-keywords']}>
                <span>SUSTAINABILITY</span>
                <span>BIO-DESIGN</span>
                <span>ECOLOGY</span>
            </div>
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
    </>
  );
}

export default Cheso;
