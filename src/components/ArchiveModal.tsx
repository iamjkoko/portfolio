import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import type { ArchiveEntry } from '../data/archive';
import ArchiveVideo from './ArchiveVideo';
import { useLenis } from './LenisProvider';

const archiveModalFade = {
  duration: 0.4,
  ease: [0.45, 0, 0.2, 1] as const,
};

type ArchiveModalProps = {
  entry: ArchiveEntry | null;
  onClose: () => void;
};

function ArchiveModal({ entry, onClose }: ArchiveModalProps) {
  const lenis = useLenis();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!entry) return;
    lenis?.stop();
    return () => {
      lenis?.start();
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [entry, lenis]);

  useEffect(() => {
    if (!entry) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

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
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [entry, onClose]);

  return createPortal(
    <AnimatePresence>
      {entry ? (
        <motion.div
          key="archive-modal"
          className="fixed inset-0 z-[10100] flex items-center justify-center overflow-hidden overscroll-contain bg-black/65 p-3 sm:p-4"
          data-lenis-prevent
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={archiveModalFade}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="archive-modal-title"
            className="relative my-auto flex max-h-[min(82dvh,calc(100dvh-1rem))] min-h-0 w-full max-w-[min(96vw,1080px)] flex-col overflow-hidden rounded-lg border border-[var(--color-border-gray)]/30 bg-[var(--color-background)] text-[var(--color-text)] shadow-xl py-8 px-6 sm:max-h-[min(90dvh,calc(100dvh-2rem))] sm:min-h-[50dvh] sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={archiveModalFade}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-transparent text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              aria-label="Close"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div
              className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] [touch-action:pan-y] sm:flex-row sm:gap-8 sm:items-stretch sm:overflow-hidden sm:[touch-action:auto]"
              data-lenis-prevent
            >
              <div className="mx-auto w-full max-w-[480px] shrink-0 sm:mx-0 sm:w-[min(40%,380px)] sm:max-w-[380px]">
                <div className="aspect-[3/2] w-full overflow-hidden">
                  {entry.media.type === 'image' ? (
                    <img
                      className="block h-full w-full object-cover rounded-none"
                      src={entry.media.src}
                      alt={entry.media.alt}
                      draggable={false}
                    />
                  ) : (
                    <ArchiveVideo src={entry.media.src} />
                  )}
                </div>
              </div>

              <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 sm:gap-4 sm:overflow-y-auto sm:overscroll-contain sm:[-webkit-overflow-scrolling:touch]">
                <h2
                  id="archive-modal-title"
                  className="m-0 shrink-0 pr-8 text-[0.92rem] leading-snug [font-variation-settings:'wght'_600] sm:text-xl md:text-2xl sm:leading-normal"
                >
                  {entry.title}
                  {entry.year ? (
                    <span className="ml-1.5 text-[0.62em] text-[var(--color-text-muted)] [font-variation-settings:'wght'_450] sm:text-[0.6em]">
                      {entry.year}
                    </span>
                  ) : null}
                </h2>

                {entry.keywords && entry.keywords.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {entry.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-[30px] bg-[var(--color-keyword-bg)] px-3 py-1 text-xs text-[var(--color-keyword-text)] [font-variation-settings:'wght'_400] sm:text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : null}

                {entry.description ? (
                  <p className="m-0 text-[0.78rem] leading-relaxed [font-variation-settings:'wght'_400] sm:text-base md:text-[0.9rem]">
                    {entry.description}
                  </p>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export default ArchiveModal;
