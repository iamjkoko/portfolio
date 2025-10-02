import React from 'react';
import '../global.css';
import styles from '../styles/archive.module.css';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

// Others images
import Cheso from '../assets/images/archive/cheso/cheso.webp';
import InfinityBox from '../assets/images/archive/infinity-box/infinity-box.webp';
import Paintbox from '../assets/images/archive/paintbox/paintbox.webp';
import Paperfold from '../assets/images/archive/paperfold/paperfold.webp';
import SaoPaulo from '../assets/images/archive/sao-paulo/saopaulo.webp';
import LightPainting from '../assets/images/archive/light-painting/light-painting.webp';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function Archive() {
  return (
    <>
    <Navbar theme="light"></Navbar>

    <section id="archive" className={styles.archive}>

    <section id="Others">
        <div className={styles.gallery}>
        <div className={styles.project}>
            <Link to={ROUTES.ARCHIVE.OTHERS.INFINITYBOX}>
            <div className={styles.thumbnail}>
                <img src={InfinityBox} alt="Infinity Box" />
            </div>
            </Link>
        </div>
        <div className={styles.project}>
            <Link to={ROUTES.ARCHIVE.OTHERS.PAINTBOX}>
            <div className={styles.thumbnail}>
                <img src={Paintbox} alt="Paintbox" />
            </div>
            </Link>
        </div>
        <div className={styles.project}>
            <Link to={ROUTES.ARCHIVE.OTHERS.PAPERFOLD}>
            <div className={styles.thumbnail}>
                <img src={Paperfold} alt="Paperfold" />
            </div>
            </Link>
        </div>
        <div className={styles.project}>
            <Link to={ROUTES.ARCHIVE.OTHERS.CHESO}>
            <div className={styles.thumbnail}>
                <img src={Cheso} alt="Cheso" />
            </div>
            </Link>
        </div>
        <div className={styles.project}>
            <Link to={ROUTES.ARCHIVE.OTHERS.SAOPAULO}>
            <div className={styles.thumbnail}>
                <img src={SaoPaulo} alt="Sao Paulo" />
            </div>
            </Link>
        </div>
        <div className={styles.project}>
            <Link to={ROUTES.ARCHIVE.OTHERS.LIGHTPAINTING}>
            <div className={styles.thumbnail}>
                <img src={LightPainting} alt="Light Painting" />
            </div>
            </Link>
        </div> 
        </div>
        </section>
    </section>

    <Footer theme='light' />
    </>
  );
}

export default Archive;


