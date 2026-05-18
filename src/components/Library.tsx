import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, X } from 'lucide-react';

import {
  libraryEntries,
  type LibraryCategory,
  type LibraryEntry,
} from '../data/library';
import { useLenis } from './LenisProvider';

const FILTERS: { value: LibraryCategory; label: string }[] = [
  { value: 'film', label: 'FILMS' },
  // { value: 'book', label: 'BOOKS' },
  { value: 'music', label: 'MUSIC' },
];

const libraryFade = {
  duration: 0.4,
  ease: [0.45, 0, 0.2, 1] as const,
};

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="mt-1.5 flex gap-0.5 sm:mt-2" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fillPercent = Math.max(0, Math.min(1, rating - (i - 1)));
        const fillWidth = `${fillPercent * 100}%`;
        const isEmpty = fillPercent <= 0;

        return (
          <span key={i} className="relative inline-flex h-3.5 w-3.5 sm:h-5 sm:w-5" aria-hidden>
            <Star
              className="absolute inset-0 h-3.5 w-3.5 sm:h-5 sm:w-5 fill-transparent text-[var(--color-border-gray)]"
              strokeWidth={1.25}
            />
            {!isEmpty ? (
              <span className="absolute inset-0 overflow-hidden" style={{ width: fillWidth }}>
                <Star
                  className="h-3.5 w-3.5 sm:h-5 sm:w-5 fill-[var(--color-text)] text-[var(--color-text)]"
                  strokeWidth={1.25}
                />
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

function Library() {
  const [filter, setFilter] = useState<LibraryCategory>('film');
  const [selected, setSelected] = useState<LibraryEntry | null>(null);
  const lenis = useLenis();

  const filteredItems = useMemo(
    () => libraryEntries.filter((e) => e.category === filter),
    [filter],
  );

  useEffect(() => {
    if (!selected) return;
    lenis?.stop();
    return () => {
      lenis?.start();
      // Guarantee the class is gone even if the lenis instance identity
      // changed between stop() and cleanup (e.g. during dev HMR).
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [selected, lenis]);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selected) return;
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
        setSelected(null);
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
  }, [selected]);

  const modal = createPortal(
    <AnimatePresence>
      {selected ? (
        <motion.div
          key="library-modal"
          className="fixed inset-0 z-[10100] flex items-center justify-center overflow-hidden overscroll-contain bg-black/65 p-3 sm:p-4"
          data-lenis-prevent
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={libraryFade}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="library-modal-title"
            className="relative my-auto flex max-h-[min(72dvh,calc(100dvh-2.5rem))] min-h-0 w-full max-w-[min(86vw,340px)] flex-col overflow-hidden rounded-lg bg-[var(--color-background)] text-[var(--color-text)] shadow-xl py-8 px-8 sm:max-h-[60vh] sm:max-w-[min(94vw,900px)] sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={libraryFade}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-transparent text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              aria-label="Close"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
            <div
              className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] [touch-action:pan-y] sm:flex-row sm:gap-8 sm:items-stretch sm:overflow-hidden sm:[touch-action:auto]"
              data-lenis-prevent
            >
              <div className="mx-auto w-full max-w-[200px] shrink-0 overflow-hidden sm:mx-0 sm:w-[min(38%,300px)] sm:max-w-[300px]">
                <div
                  className={
                    selected.category === 'music'
                      ? 'aspect-square w-full overflow-hidden'
                      : 'aspect-[2/3] w-full overflow-hidden'
                  }
                >
                  <img
                    className="block h-full w-full object-cover rounded-none"
                    src={selected.coverImage}
                    alt=""
                    draggable={false}
                  />
                </div>
              </div>
              <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-visible sm:overflow-hidden">
                <h2
                  id="library-modal-title"
                  className="shrink-0 pr-8 text-[0.92rem] leading-snug [font-variation-settings:'wght'_600] sm:text-xl md:text-2xl sm:leading-normal"
                >
                  {selected.title}
                  <span className="ml-1.5 text-[0.62em] text-[var(--color-text-muted)] [font-variation-settings:'wght'_450] sm:text-[0.6em]">
                    {selected.year}
                  </span>
                </h2>
                <p className="mt-1.5 shrink-0 text-[0.7rem] leading-relaxed [font-variation-settings:'wght'_400] whitespace-pre-line sm:text-base md:text-[1.0625rem]">
                  {selected.author}
                </p>
                <div className="mt-1 shrink-0 sm:mt-2">
                  <RatingStars rating={selected.rating} />
                </div>
                <div
                  className="mt-2 min-h-0 flex-none overflow-visible sm:mt-4 sm:flex-1 sm:overflow-y-auto sm:overscroll-contain sm:[-webkit-overflow-scrolling:touch]"
                  data-lenis-prevent
                  tabIndex={0}
                  aria-label="Review"
                >
                  <div className="flex flex-col gap-1 sm:gap-2">
                    {selected.review.split('\n').map((block, i) => (
                      <p
                        key={i}
                        className="m-0 text-[0.78rem] leading-relaxed [font-variation-settings:'wght'_400] sm:text-base md:text-[0.9rem]"
                      >
                        {block || '\u00A0'}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );

  return (
    <section className="w-full bg-[var(--color-background)]">
      <div className="w-full max-w-[1440px] mx-auto px-5 mt-16 pb-16 max-[935px]:px-[var(--page-padding-x-mobile)]">
        <h2 className="text-[1.5rem] max-[935px]:text-[1.2rem] [font-variation-settings:'wght'_700] text-[var(--color-text-muted)]">
          LIBRARY
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Library categories">
          {FILTERS.map(({ value, label }) => {
            const isActive = filter === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(value)}
                className={`cursor-pointer rounded-[30px] px-4 py-1.5 text-sm [font-variation-settings:"wght"_400] transition-colors duration-250 ease-out ${
                  isActive
                    ? 'bg-[var(--color-text)] text-[var(--color-background)]'
                    : 'bg-[var(--color-keyword-bg)] text-[var(--color-keyword-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-background)]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={filter}
            className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 sm:gap-3 list-none p-0 m-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={libraryFade}
          >
            {filteredItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="group w-full cursor-pointer border-0 bg-transparent p-0 text-left"
                >
                  <div className="border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.98]">
                    <div
                      className={
                        item.category === 'music'
                          ? 'w-full aspect-square overflow-hidden'
                          : 'w-full aspect-[2/3] overflow-hidden'
                      }
                    >
                      <img
                        className="block h-full w-full object-cover rounded-none"
                        src={item.coverImage}
                        alt={item.title}
                        draggable={false}
                      />
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
        {modal}
      </div>
    </section>
  );
}

export default Library;
