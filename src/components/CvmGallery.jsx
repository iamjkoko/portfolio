import React, { useState, useEffect } from 'react';
import './styles/cvm-gallery.css';

const CvmGalleryItem = ({ src, alt }) => {
    const [isActive, setIsActive] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [isTransitioning, setIsTransitioning] = useState(false);
  
    useEffect(() => {
      const preload = new Image();
      preload.src = alt;
    }, [alt]);
  
    const handleClick = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        const newSrc = isActive ? src : alt;
        setCurrentSrc(newSrc);
        setIsActive(!isActive);
        setIsTransitioning(false);
      }, 250); // Match CSS duration
    };
  
    return (
      <div className="cvm-object">
        <img
          className={`cvm-shadow ${isTransitioning ? 'cvm-fade-blur' : ''}`}
          src={currentSrc}
          alt=""
          onClick={handleClick}
        />
      </div>
    );
  };
  

const CvmGallery = ({ images }) => {
  return (
    <section id="cvm-gallery">
      <div className="cvm-objects">
        {images.map((img, index) => (
          <CvmGalleryItem key={index} src={img.src} alt={img.alt} />
        ))}
      </div>
      <h3>CLICK EACH IMAGE TO REVEAL ↑</h3>
    </section>
  );
};

export default CvmGallery;