import { useState } from 'react';

import Placeholder from '../assets/images/background/placeholder-lt.png';

type ArchiveImageProps = {
  src: string;
  alt: string;
  className?: string;
};

function ArchiveImage({ src, alt, className }: ArchiveImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      <img
        src={Placeholder}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute inset-0 block w-full h-full object-cover pointer-events-none"
      />
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`relative block w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${loaded ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}
      />
    </div>
  );
}

export default ArchiveImage;
