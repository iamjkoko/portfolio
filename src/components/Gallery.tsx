import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  autoplayInterval?: number;
}

const Gallery = ({ images, autoplayInterval = 4000 }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Touch handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Autoplay management
  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      goNext();
    }, autoplayInterval);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const pauseAutoplay = () => {
    stopAutoplay();
    setIsAutoplayActive(false);
  };

  const resumeAutoplayDelayed = (delay = 2000) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoplayActive(true);
    }, delay);
  };

  useEffect(() => {
    if (isAutoplayActive) startAutoplay();
    else stopAutoplay();

    return () => {
      stopAutoplay();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [isAutoplayActive, autoplayInterval]);

  useEffect(() => {
    if (isAutoplayActive && !isTransitioning) startAutoplay();
  }, [currentIndex]);

  const navigate = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;

    pauseAutoplay();
    setIsTransitioning(true);
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const isNext = direction === "next";
    const swipeOutClass = isNext ? "swipe-left" : "swipe-right";
    const swipeInClass = isNext ? "swipe-in" : "swipe-in-from-left";

    imageElement.classList.add(swipeOutClass);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        isNext
          ? prevIndex === images.length - 1 ? 0 : prevIndex + 1
          : prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );

      imageElement.classList.remove(swipeOutClass);
      imageElement.classList.add(swipeInClass);

      setTimeout(() => {
        imageElement.classList.remove(swipeInClass);
        setIsTransitioning(false);
        resumeAutoplayDelayed();
      }, 500);
    }, 300);
  };

  const goPrev = () => navigate("prev");
  const goNext = () => navigate("next");

  // Touch handlers on container
  const onTouchStart = (e: React.TouchEvent) => {
    pauseAutoplay();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goNext();
    else if (isRightSwipe) goPrev();
    else resumeAutoplayDelayed();
  };

  return (
    <div
      className="flex items-center justify-center gap-2.5 relative max-[935px]:flex-col max-[935px]:gap-5"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: "pan-y" }} // allow vertical scroll
    >
      <button
        onClick={goPrev}
        className="bg-transparent border-none cursor-pointer transition-opacity hover:opacity-70 max-[935px]:hidden"
        aria-label="Previous"
        disabled={isTransitioning}
      >
        <ChevronLeft size={32} />
      </button>

      <img
        ref={imageRef}
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="h-screen w-full object-cover transition-[transform,opacity] duration-[400ms] ease-in-out translate-x-0 max-[935px]:max-w-[600px] max-[935px]:max-h-[400px] max-[935px]:order-1"
      />

      <button
        onClick={goNext}
        className="bg-transparent border-none cursor-pointer transition-opacity hover:opacity-70 max-[935px]:hidden"
        aria-label="Next"
        disabled={isTransitioning}
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default Gallery;
