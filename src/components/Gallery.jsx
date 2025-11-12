import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    imageElement.classList.add("swipe-right");
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      
      // Remove swipe out class and add swipe in animation from left
      imageElement.classList.remove("swipe-right");
      imageElement.classList.add("swipe-in-from-left");
      
      // Reset animation classes after animation completes
      setTimeout(() => {
        imageElement.classList.remove("swipe-in-from-left");
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
    imageElement.classList.add("swipe-left");
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      
      // Remove swipe out class and add swipe in animation
      imageElement.classList.remove("swipe-left");
      imageElement.classList.add("swipe-in");
      
      // Reset animation classes after animation completes
      setTimeout(() => {
        imageElement.classList.remove("swipe-in");
        setIsTransitioning(false);
        // Resume autoplay after transition
        setTimeout(() => {
          resumeAutoplay();
        }, 2000);
      }, 500);
    }, 300);
  };

  return (
    <div className="flex items-center justify-center gap-2.5 relative overflow-hidden max-[935px]:flex-col max-[935px]:gap-5 max-[935px]:pb-10">
      <button 
        onClick={goPrev} 
        className="bg-transparent border-none cursor-pointer max-[935px]:hidden" 
        aria-label="Previous"
      >
        <ChevronLeft size={32} />
      </button>

      <img
        ref={imageRef}
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="max-w-[1280px] max-h-[960px] object-cover mt-[100px] transition-[transform,opacity] duration-[400ms] ease-in-out translate-x-0 max-[935px]:max-w-[600px] max-[935px]:max-h-[400px] max-[935px]:mt-20 max-[935px]:order-1"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      <button 
        onClick={goNext} 
        className="bg-transparent border-none cursor-pointer max-[935px]:hidden" 
        aria-label="Next"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default Gallery;