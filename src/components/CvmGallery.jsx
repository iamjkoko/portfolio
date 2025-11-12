import React, { useState, useEffect } from 'react';
// import './styles/cvm-gallery.css'; // Kept for reference, now using Tailwind

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
      <div className="overflow-hidden max-w-[360px] max-h-[360px] w-full h-auto rounded-[3px] md:rounded-md">
        <img
          className={`block w-full h-auto object-cover transition-all duration-[250ms] ease-in-out cursor-pointer ${
            isTransitioning ? 'opacity-0 blur-md' : 'opacity-100 blur-0'
          }`}
          src={currentSrc}
          alt=""
          onClick={handleClick}
        />
      </div>
    );
  };
  

const CvmGallery = ({ images }) => {
  return (
    <section className="w-full flex flex-col items-center bg-white my-[30px] md:my-20">
      <div className="grid grid-cols-3 gap-[10px] md:gap-10 justify-center mx-auto overflow-hidden px-[8%] pb-[4%] md:px-8 md:pb-12">
        {images.map((img, index) => (
          <CvmGalleryItem key={index} src={img.src} alt={img.alt} />
        ))}
      </div>
      <h3 className="font-light text-base md:text-xl md:pt-0 pt-[4%]">CLICK EACH IMAGE TO REVEAL ↑</h3>
    </section>
  );
};

export default CvmGallery;