import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize
} from 'lucide-react';

const VideoPlayer = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [error, setError] = useState(null);
  
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
      <div className="w-full">
        <div 
          ref={containerRef}
          className="relative bg-black rounded-lg overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => playing && setShowControls(false)}
        >
          {/* Video Player */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white z-10">
                <p>Error loading video: {error}</p>
              </div>
            )}
            <div className="absolute inset-0 w-full h-full z-0">
              <ReactPlayer
                ref={playerRef}
                url={url}
                playing={playing}
                volume={1}
                muted={muted}
                width="100%"
                height="100%"
                onError={(e) => setError(e.toString())}
                onReady={() => console.log('Video ready')}
                config={{
                  vimeo: {
                    playerOptions: {
                      controls: false
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Custom Controls */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-black/50 transition-opacity duration-300 z-20 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center justify-between px-4 py-3">
              {/* Play/Pause */}
              <button
                onClick={handlePlayPause}
                className="text-white hover:opacity-70 transition-opacity"
              >
                {playing ? <Pause size={28} /> : <Play size={28} />}
              </button>

              <div className="flex items-center gap-4">
                {/* Volume/Mute */}
                <button
                  onClick={handleToggleMute}
                  className="text-white hover:opacity-70 transition-opacity"
                >
                  {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>

                {/* Fullscreen */}
                <button
                  onClick={handleFullscreen}
                  className="text-white hover:opacity-70 transition-opacity"
                >
                  {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
};

export default VideoPlayer;