import React, { useRef } from 'react';
import '../../global.css';
import styles from '../../styles/works.module.css';

import Footer from '../../components/Footer';
import useProjectInfoStagger from '../../hooks/useProjectInfoStagger';

import ChesoFull from '../../assets/images/archive/cheso/cheso-full.webp';

function Cheso(): React.JSX.Element {
  const projectInfoRef = useRef<HTMLDivElement | null>(null);
  useProjectInfoStagger(projectInfoRef);

  return (
    <>
      <section id="project-main" className={styles['project-main']}>
        <div ref={projectInfoRef} className={styles['project-info']}>
        <div className={styles['project-basics']}>
            <h1>Cheso</h1>
            <br />
            <h2>2022</h2>
            <h3>Vegetables, <br />Rice-based Clay</h3>
        </div>
        <div className={styles['project-intro']}>
            <p>Cheso (Korean: 채소) embodies the concept of <strong>recyclability</strong> and a <strong>return to nature</strong>. Crafted entirely from eco-friendly materials such as vegetables and rice-based clay, these artifacts blend <strong>functionality</strong> and <strong>sustainability</strong>.</p>
            <p>Designed as vessels and decorative items, each piece carries a dual purpose: to serve in daily life and to symbolize the human interconnectedness with the natural world.</p>
            <br />
            <p>After fulfilling their purpose, the items are designed to "return to nature" through natural decomposition, which leaves no trace and therefore reinforces the <strong>cyclical relationship between humans and the environment</strong>. Cheso not only challenges the boundaries of traditional material usage but also reimagines how art and utility can coexist in an environmentally conscious way. It invites viewers to reflect on impermanence, sustainability, and the beauty of embracing organic forms in design.</p>
            <div className={styles['project-keywords']}>
                <span>SUSTAINABILITY</span>
                <span>BIO-DESIGN</span>
                <span>ECOLOGY</span>
            </div>
        </div>
        </div>
        <img className={styles['project-img']} src={ChesoFull} alt="Cheso Full" />
      </section>

      <br />

      <Footer theme="light" />
    </>
  );
}

export default Cheso;
