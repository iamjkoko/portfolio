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

const SWIPE_DURATION_MS = 400;

const Gallery = ({ images, autoplayInterval = 4000 }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeOutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeInTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      navigate("next", { fromUser: false });
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
    if (isAutoplayActive && !isTransitioning) startAutoplay();
    else stopAutoplay();

    return () => stopAutoplay();
  }, [isAutoplayActive, autoplayInterval, isTransitioning]);

  useEffect(() => {
    return () => {
      stopAutoplay();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      if (swipeOutTimeoutRef.current) clearTimeout(swipeOutTimeoutRef.current);
      if (swipeInTimeoutRef.current) clearTimeout(swipeInTimeoutRef.current);
    };
  }, []);

  const navigate = (
    direction: "prev" | "next",
    { fromUser = true }: { fromUser?: boolean } = {}
  ) => {
    if (isTransitioning) return;

    stopAutoplay();
    if (fromUser) pauseAutoplay();
    setIsTransitioning(true);

    const isNext = direction === "next";
    const swipeOutClass = isNext ? "swipe-left" : "swipe-right";
    const swipeInClass = isNext ? "swipe-in" : "swipe-in-from-left";

    setAnimationClass(swipeOutClass);

    swipeOutTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        isNext
          ? prevIndex === images.length - 1
            ? 0
            : prevIndex + 1
          : prevIndex === 0
            ? images.length - 1
            : prevIndex - 1
      );
      setAnimationClass(swipeInClass);

      swipeInTimeoutRef.current = setTimeout(() => {
        setAnimationClass("");
        setIsTransitioning(false);
        if (fromUser) resumeAutoplayDelayed();
      }, SWIPE_DURATION_MS);
    }, SWIPE_DURATION_MS);
  };

  const goPrev = () => navigate("prev");
  const goNext = () => navigate("next");

  const onTouchStart = (e: React.TouchEvent) => {
    pauseAutoplay();
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    const touchStart = touchStartRef.current;
    const touchEnd = touchEndRef.current;

    if (touchStart === null) return;

    if (touchEnd === null) {
      resumeAutoplayDelayed();
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goNext();
    else if (isRightSwipe) goPrev();
    else resumeAutoplayDelayed();
  };

  return (
    <div
      className="flex items-center justify-center gap-2.5 relative max-mobile:flex-col max-mobile:gap-5"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: "pan-y" }}
    >
      <button
        onClick={goPrev}
        className="bg-transparent border-none cursor-pointer transition-opacity hover:opacity-70 max-mobile:hidden"
        aria-label="Previous"
        disabled={isTransitioning}
      >
        <ChevronLeft size={32} />
      </button>

      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className={`w-full max-w-[1280px] mx-auto overflow-hidden rounded-[8px] box-border object-cover translate-x-0 max-mobile:max-h-[400px] max-mobile:order-1 ${animationClass}`}
      />

      <button
        onClick={goNext}
        className="bg-transparent border-none cursor-pointer transition-opacity hover:opacity-70 max-mobile:hidden"
        aria-label="Next"
        disabled={isTransitioning}
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default Gallery;
