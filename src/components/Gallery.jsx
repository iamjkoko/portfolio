import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./styles/gallery.module.css";

const Gallery = ({ images, autoplayInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const imageRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const autoplayRef = useRef(null);

  // Minimum distance for a swipe
  const minSwipeDistance = 50;

  // Autoplay functionality
  const startAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    autoplayRef.current = setInterval(() => {
      if (!isTransitioning && isAutoplayActive) {
        goNext();
      }
    }, autoplayInterval);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const pauseAutoplay = () => {
    setIsAutoplayActive(false);
    stopAutoplay();
  };

  const resumeAutoplay = () => {
    setIsAutoplayActive(true);
    startAutoplay();
  };

  // Initialize autoplay on component mount
  useEffect(() => {
    startAutoplay();
    
    return () => {
      stopAutoplay();
    };
  }, [isAutoplayActive, isTransitioning]);

  // Restart autoplay when currentIndex changes
  useEffect(() => {
    if (isAutoplayActive) {
      startAutoplay();
    }
  }, [currentIndex]);

  const onTouchStart = (e) => {
    pauseAutoplay();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goNext();
    } else if (isRightSwipe) {
      goPrev();
    }
    
    // Resume autoplay after a short delay
    setTimeout(() => {
      resumeAutoplay();
    }, 2000);
  };

  const goPrev = () => {
    if (isTransitioning) return;
    
    pauseAutoplay();
    setIsTransitioning(true);
    const imageElement = imageRef.current;
    
    // Add swipe out animation
    imageElement.classList.add(styles.swipeRight);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      
      // Remove swipe out class and add swipe in animation from left
      imageElement.classList.remove(styles.swipeRight);
      imageElement.classList.add(styles.swipeInFromLeft);
      
      // Reset animation classes after animation completes
      setTimeout(() => {
        imageElement.classList.remove(styles.swipeInFromLeft);
        setIsTransitioning(false);
        // Resume autoplay after transition
        setTimeout(() => {
          resumeAutoplay();
        }, 2000);
      }, 500);
    }, 300);
  };

  const goNext = () => {
    if (isTransitioning) return;
    
    pauseAutoplay();
    setIsTransitioning(true);
    const imageElement = imageRef.current;
    
    // Add swipe out animation
    imageElement.classList.add(styles.swipeLeft);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      
      // Remove swipe out class and add swipe in animation
      imageElement.classList.remove(styles.swipeLeft);
      imageElement.classList.add(styles.swipeIn);
      
      // Reset animation classes after animation completes
      setTimeout(() => {
        imageElement.classList.remove(styles.swipeIn);
        setIsTransitioning(false);
        // Resume autoplay after transition
        setTimeout(() => {
          resumeAutoplay();
        }, 2000);
      }, 500);
    }, 300);
  };

  return (
    <div className={styles.gallery}>
      <button onClick={goPrev} className={styles.navButton} aria-label="Previous">
        <ChevronLeft size={32} />
      </button>

      <img
        ref={imageRef}
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className={styles.image}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      <button onClick={goNext} className={styles.navButton} aria-label="Next">
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default Gallery;