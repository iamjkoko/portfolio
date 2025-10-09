import React from 'react';
import '../../global.css';
import styles from '../../styles/works.module.css';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import ImgCredit from '../../components/ImgCredit';

import SaoPaulo1 from '../../assets/images/archive/sao-paulo/saopaulo-1.webp';

function SaoPaulo() {
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
  return (
    <div style={themeStyles["light"]}>
      <Navbar theme="light" />
      <section id="project-main" className={styles.projectMain}>
      <img src={SaoPaulo1} alt="Sao Paulo" className={styles['project-img']} />
        <div className={styles['project-info']}>
        <div className={styles['project-basics']}>
            <h1>Fragments of São Paulo</h1>
            <br />
            <h2>2021</h2>
            <h3>Digital Collage (Cardboard, Adobe Photoshop)</h3>
        </div>
        <div className={styles['project-intro']}>
            <h4>This project explores the complex reality of Brazil's urban slums, also known as <strong>favelas</strong>. Rooted in historical urban migrations, these communities have become symbols of <strong>cyclical poverty</strong> passed down through generations.</h4>
            <br />
            <h4>Drawing from my firsthand experience in São Paulo, I aim to reflect on the sheer contrast between the city's vibrant culture and the harsh realities of its marginalized communities. The collage is shaped into <strong>São Paulo's map</strong>, which serves as a visual narrative that highlights the city's dual nature: a <strong>dynamic urban identity</strong> overlaying persistent <strong>socioeconomic struggles</strong>.</h4>
        </div>
        </div>

        <div className={styles['project-description']}>
        <div className={styles['description']}>
        <div className={styles['description-body']}>
            <h5>One of Brazil's most pressing societal challenges lies in its infamous slums, also referred to as favelas. These neighborhoods emerged much like slum communities worldwide, as rural populations migrated to cities in search of opportunities, only to find themselves confined to makeshift housing on the fringes of urban life. Over time, this cyclical poverty has become deeply embedded within the society, passing from one generation to the next with little hope of escape.</h5>
            <br />
            <h5>The following video by Vox delves into the history and social dynamics of favelas in Rio de Janeiro, a major city in Brazil.</h5>
            <br />
        </div>
        <div className={styles['youtube']}>
            <iframe 
            width="100%"
            height="100%" 
            src="https://www.youtube.com/embed/c3BRTlHFpBU?si=zVBfeUrpVqTgVngd" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            ></iframe>
        </div>
        <ImgCredit src={SaoPaulo1} alt="Sao Paulo"> 
        By <a href="https://www.youtube.com/user/voxdotcom" target="_blank" rel="noopener noreferrer">Vox</a> · YouTube <a rel="nofollow" className="external free" href="https://www.youtube.com/watch?v=c3BRTlHFpBU" target="_blank">https://www.youtube.com/watch?v=c3BRTlHFpBU</a>, © Vox / YouTube, All rights reserved
        </ImgCredit>
        <div className={styles['description-body']}>
            <br />
            <h5>Having lived in São Paulo, also one of Brazil's largest cities, for four years, I had the unique opportunity to observe the favela communities up close. As someone who grew up in a vastly different environment in South Korea, I was struck by the juxtaposition between the large, vibrant murals and the impoverished homes they covered. The colorful wall paintings seemed to mask the harsh realities beneath, creating an irony that lingered in my mind.</h5>
            <br />
            <h5>This work serves to reflect that contradiction. By collaging images of favelas into the shape of São Paulo's map, I aimed to capture the duality of this city: its vibrancy contrasted with the systemic issues that perpetuate poverty. From a distance, the colorful composition celebrates the unique identity of São Paulo. Yet upon closer inspection, the fragmented houses reveal the city's deeper struggles, communicating the inescapable cycle that defines life in the favelas.</h5>
        </div>
        </div>
        </div>
      </section>

      <br />

      <Footer theme="light" />
    </div>
  );
}

export default SaoPaulo;


