import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, Volume2, VolumeX, X } from 'lucide-react';

import type { ArchiveEntry } from '../data/archive';
import { useLenis } from './LenisProvider';

const modalFade = {
  duration: 0.4,
  ease: [0.45, 0, 0.2, 1] as const,
};

const CONTROLS_HIDE_DELAY_MS = 2000;

type VideoModalProps = {
  entry: ArchiveEntry | null;
  onClose: () => void;
};

function VideoModal({ entry, onClose }: VideoModalProps) {
  const lenis = useLenis();
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimerRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [controlsVisible, setControlsVisible] = useState(true);

  const isOpen = Boolean(entry?.modalVideoSrc);

  // Lock page scroll while the modal is open (same pattern as Library).
  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    return () => {
      lenis?.start();
      // Guarantee the class is gone even if the lenis instance identity
      // changed between stop() and cleanup (e.g. during dev HMR).
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [isOpen, lenis]);

  // Escape to close + focus trap, restoring focus to the trigger on close.
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && focusable.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  // Reset player state whenever a new entry opens.
  useEffect(() => {
    if (!isOpen) return;
    setIsPlaying(false);
    setIsMuted(false);
    setVolume(1);
    setControlsVisible(true);
  }, [isOpen, entry?.id]);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setControlsVisible(false);
    }, CONTROLS_HIDE_DELAY_MS);
  }, [clearHideTimer]);

  useEffect(() => clearHideTimer, [clearHideTimer]);

  // Keep controls visible while paused.
  useEffect(() => {
    if (!isPlaying) {
      clearHideTimer();
      setControlsVisible(true);
    }
  }, [isPlaying, clearHideTimer]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setIsMuted(next);
  };

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;
    setVolume(value);
    if (!video) return;
    video.volume = value;
    if (value > 0 && video.muted) {
      video.muted = false;
      setIsMuted(false);
    }
    if (value === 0 && !video.muted) {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return createPortal(
    <AnimatePresence>
      {entry?.modalVideoSrc ? (
        <motion.div
          key="video-modal"
          className="fixed inset-0 z-[10100] flex items-center justify-center overflow-hidden overscroll-contain bg-black/85 p-4 sm:p-8"
          data-lenis-prevent
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={modalFade}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          onPointerMove={showControls}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={entry.title}
            className="relative max-h-full max-w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={modalFade}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-10 right-0 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-transparent text-white/60 transition-colors hover:text-white"
              aria-label="Close"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            <video
              ref={videoRef}
              className="block max-h-[85dvh] max-w-[92vw] w-auto h-auto cursor-pointer rounded-[8px] object-contain"
              src={entry.modalVideoSrc}
              playsInline
              loop
              preload="auto"
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onVolumeChange={(e) => {
                const video = e.currentTarget;
                setIsMuted(video.muted);
                setVolume(video.volume);
              }}
            />

            {/* Custom control bar */}
            <div
              className={`absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-b-[8px] bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 transition-opacity duration-300 ease-out ${
                controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent text-white/80 transition-colors hover:text-white"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause size={18} strokeWidth={1.5} fill="currentColor" />
                ) : (
                  <Play size={18} strokeWidth={1.5} fill="currentColor" />
                )}
              </button>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent text-white/80 transition-colors hover:text-white"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={18} strokeWidth={1.5} />
                  ) : (
                    <Volume2 size={18} strokeWidth={1.5} />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="h-1 w-20 cursor-pointer accent-white"
                  aria-label="Volume"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export default VideoModal;
