import React from 'react';
import '../global.css';
import '../assets/fonts/boska/boska.css';
import styles from '../styles/works.module.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImgCredit from '../components/ImgCredit';

import CavemanMain from '../assets/images/works/caveman/caveman.webp';
import AllegoryOfCave from '../assets/images/works/caveman/allegory-cave.webp';
import CvmGallery from '../components/CvmGallery';

import Progress1 from '../assets/images/works/caveman/progress-1.webp';
import Progress2 from '../assets/images/works/caveman/progress-2.webp';

// Import Caveman
import Horse from '../assets/images/works/caveman/horse.webp';
import HorseReal from '../assets/images/works/caveman/horse-real.webp';
import Wineglass from '../assets/images/works/caveman/wineglass.webp';
import WineglassReal from '../assets/images/works/caveman/wineglass-real.webp';
import Candle from '../assets/images/works/caveman/candle.webp';
import CandleReal from '../assets/images/works/caveman/candle-real.webp';
import Toygun from '../assets/images/works/caveman/toygun.webp';
import ToygunReal from '../assets/images/works/caveman/toygun-real.webp';
import Plant from '../assets/images/works/caveman/plant.webp';
import PlantReal from '../assets/images/works/caveman/plant-real.webp';
import Bowling from '../assets/images/works/caveman/bowling.webp';
import BowlingReal from '../assets/images/works/caveman/bowling-real.webp';
import Sunglasses from '../assets/images/works/caveman/sunglasses.webp';
import SunglassesReal from '../assets/images/works/caveman/sunglasses-real.webp';
import Charger from '../assets/images/works/caveman/charger.webp';
import ChargerReal from '../assets/images/works/caveman/charger-real.webp';
import Birdcage from '../assets/images/works/caveman/birdcage.webp';
import BirdcageReal from '../assets/images/works/caveman/birdcage-real.webp';


function Caveman() {
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
  const cavemanImages = [
    {src: Horse, alt: HorseReal},
    {src: Wineglass, alt: WineglassReal},
    {src: Candle, alt: CandleReal},
    {src: Toygun, alt: ToygunReal},
    {src: Plant, alt: PlantReal},
    {src: Bowling, alt: BowlingReal},
    {src: Sunglasses, alt: SunglassesReal},
    {src: Charger, alt: ChargerReal},
    {src: Birdcage, alt: BirdcageReal},
  ]
  return (
    <div style={themeStyles["light"]}>
    <Navbar theme="light" />
    <section id="project-main" className={styles.projectMain}>
        <img className={styles['project-img']} src={CavemanMain} alt="Caveman" />
        <div className={styles['project-info']}>
        <div className={styles['project-basics']}>
            <h1>Modern Caveman</h1>
            <br />
            <h2>2025</h2>
            <h3>Blender, <br /> Adobe Photoshop</h3>
        </div>
        <div className={styles['project-intro']}>
            <h4>A series of shadow-based explorations inspired by Plato’s Allegory of the Cave, which prompts viewers to pause, reflect, and reconsider how they perceive reality. This project serves as a reminder that perception is not simply about seeing appearances, but about understanding the relationship between the human viewpoint and the deeper truths they may obscure.</h4>
        </div>
        </div>

    <section id="project-description" className={styles['project-description']}>
        <div className={styles['description']}>
        <div className={styles['description-img']}>
            <img src={AllegoryOfCave} alt="Allegory of the Cave" className={styles['largeImage']}/>
        </div>
        <ImgCredit src={AllegoryOfCave} alt="Allegory of the Cave">
            By <a href="https://en.wikipedia.org/wiki/en:Jan_Saenredam" className="extiw" title="w:en:Jan Saenredam" target="_blank"><span title="Dutch painter, engraver and cartographer (1565–1607)">Jan Saenredam</span></a> / After <a href="https://en.wikipedia.org/wiki/en:Cornelis_van_Haarlem" className="extiw" title="w:en:Cornelis van Haarlem" target="_blank"><span title="Dutch painter (1562-1638)">Cornelis van Haarlem</span></a> - British Museum<a rel="nofollow" className="external free" href="https://www.britishmuseum.org/collection/object/P_1852-1211-120" target="_blank"> https://www.britishmuseum.org/collection/object/P_1852-1211-120</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=4040982" target="_blank">Link</a>
        </ImgCredit>
        <div className={styles['description-body']}>
            <h5>In an ancient thought experiment known as <strong>Plato's Allegory of the Cave</strong>, a group of people are confined to a dark cavern, facing a wall. Behind them, objects pass in front of a fire, casting moving shadows. With no access to the outside world, these shadows become their only reality, being distorted fragments of their true forms. The allegory explores how <strong>perception, when limited, can obscure</strong> the truth and shape an illusory understanding of existence. </h5>
            <br />
            <h5>The following project draws on that idea, presenting a series of shadows cast by real-life objects, all rendered using <strong>Blender 3D Cycles</strong>. The darkness and the minimal outlines provide only limited information as to what the shadows represent. Because of this, viewers are compelled to rely on their own intuitions and their understanding of reality to interpret these ambiguous forms.</h5>
        </div>
        </div>

        <CvmGallery images={cavemanImages} />

        <div className={styles['description']}>
        <div className={styles['description-body']}>
            <h5> The shadows, in fact, are neither entirely clear nor immedietely recognizable, which prompts them to have different interpretations. This process serves to embody the <strong>human struggle for truth, knowledge and enlightenment</strong>—a desire to understand the world in its existence and the nature of reality.</h5>
            <br />
            <h5>When the actual objects are revealed, however, the outcomes are often <strong>unexpected</strong>. What once appeared to be a fresh, lively plant in shadow is, in truth, decaying and nearing death. A pair of sunglasses turns out to be missing its lenses—an essential part of its functionality. The shadow of a chess piece, despite its small size, resembles a living horse in the viewers' eye. These moments of realization communicate just how easily our <strong>perception can be misled</strong> and how we sometimes tend to form <strong>quick conclusions based on incomplete information</strong>.</h5>
            <br />
            <br />
            <h5>In the contemporary world, media outlets saturate their audience with an overwhelming amount of content, which distorts the ability to process and assess the authenticity of what is real or not through critical thinking. The rapid development of <strong>AI and deepfake technology</strong> today further reiterates the core questions asked in this project:</h5> 
            <br />
            <br />
            <div className={styles['description-quote']}>
                <em><strong>How confident can we be in what we think we know when our understanding is limited? How much should we trust our intuition—or even our own eyes?</strong></em></div>
            </div>
        </div>
    </section>

    <hr />
      
    <section id="progress" className={styles['progress']}>
        <div className={styles['progress-title']}>
            <h3>Progress: <strong>Testing lights & directions in Blender</strong></h3>
        </div>
        <div className={styles['progress-img']}>
            <img src={Progress1} alt="Progress 1" />
            <img src={Progress2} alt="Progress 2" />
        </div>        
    </section>

    </section>

    <Footer theme="light" />
    </div>
  );
}

export default Caveman;