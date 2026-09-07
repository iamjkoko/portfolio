import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

export interface CvmGalleryImage {
  src: string;
  altSrc: string;
  alt: string;
}

const CvmGalleryItem = ({ src, altSrc, alt }: CvmGalleryImage) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const preload = new Image();
    preload.src = altSrc;
  }, [altSrc]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="overflow-hidden max-w-[360px] max-h-[360px] w-full h-auto rounded-[3px] md:rounded-md relative cursor-pointer" onClick={handleClick}>
      <img
        className="block w-full h-auto object-cover transition-opacity duration-[500ms] ease-in-out"
        src={src}
        alt={alt}
      />
      <img
        className={`block w-full h-auto object-cover transition-opacity duration-[500ms] ease-in-out absolute inset-0 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        src={altSrc}
        alt={`${alt} (revealed)`}
      />
    </div>
  );
};

interface CvmGalleryProps {
  images: CvmGalleryImage[];
}

const CvmGallery = ({ images }: CvmGalleryProps) => {
  return (
    <section className="w-full flex flex-col items-center bg-[#ffffff] mb-[20px] md:my-10">
      <h3 className="font-light text-base md:text-xl md:pt-0 pb-[4%] inline-flex items-center gap-1.5">
        CLICK EACH IMAGE TO REVEAL
        <ArrowDown className="size-4 md:size-5" aria-hidden />
      </h3>
      <div className="grid grid-cols-3 gap-[10px] md:gap-10 justify-center mx-auto overflow-hidden px-[8%] pb-[4%] md:px-8 md:pb-12">
        {images.map((img, index) => (
          <CvmGalleryItem key={index} src={img.src} altSrc={img.altSrc} alt={img.alt} />
        ))}
      </div>
    </section>
  );
};

export default CvmGallery;
