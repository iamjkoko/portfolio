import { useState } from 'react';

import Placeholder from '../assets/images/background/placeholder-dk.png';

type ArchiveVideoProps = {
  src: string;
  className?: string;
};

function ArchiveVideo({ src, className }: ArchiveVideoProps) {
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
      <video
        className={`relative block w-full h-full object-cover rounded-none transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${loaded ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}
        playsInline
        autoPlay
        loop
        muted
        preload="auto"
        poster={Placeholder}
        onLoadedData={() => setLoaded(true)}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export default ArchiveVideo;
