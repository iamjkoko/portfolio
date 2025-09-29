import React from 'react';
import '../global.css';
import styles from '../styles/works-root.module.css';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

import Caveman from '../assets/images/works/caveman/caveman.webp';

import Navbar from '../components/Navbar';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';


function Works() {
  return (
    <>
    <Navbar theme="light"></Navbar>
    <section id="works-page" className={styles.worksPage}>
        <div className={styles.gallery}>
        <div className={styles.project}>
            <Link to={ROUTES.WORKS.LOGO}>
            <div className={styles.thumbnail}>
                <video playsInline autoPlay loop muted preload="auto"><source src="https://res.cloudinary.com/db6ifdikq/video/upload/v1750039959/logo_n5druz.mp4" type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
            </Link>
        </div>
        <div className={styles.project}>
            <Link to={ROUTES.WORKS.CAVEMAN}>
            <div className={styles.thumbnail}>
                <img src={Caveman} />
            </div>
            </Link>
        </div>
        <div className={styles.project}>
            <Link to={ROUTES.WORKS.AGORA}>
            <div className={styles.thumbnail}>
                <video playsInline autoPlay loop muted preload="auto"><source src="https://res.cloudinary.com/db6ifdikq/video/upload/v1750039959/agora_w0bynm.mp4" type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
            </Link>
        </div>
        </div>
    </section>

    <BackToTop theme="light" />
    <Footer theme='light' />
    </>
  );
}

export default Works;


