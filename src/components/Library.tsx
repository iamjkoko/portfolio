import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Star, X } from 'lucide-react';

import {
  libraryEntries,
  type LibraryCategory,
  type LibraryEntry,
} from '../data/library';

const FILTERS: { value: 'all' | LibraryCategory; label: string }[] = [
  { value: 'all', label: 'ALL' },
  { value: 'book', label: 'BOOKS' },
  { value: 'film', label: 'FILMS' },
  { value: 'tv', label: 'TV SHOWS' },
  { value: 'music', label: 'MUSIC' },
];

function Library() {
  const [filter, setFilter] = useState<'all' | LibraryCategory>('all');
  const [selected, setSelected] = useState<LibraryEntry | null>(null);

  const filteredItems = useMemo(
    () =>
      filter === 'all'
        ? libraryEntries
        : libraryEntries.filter((e) => e.category === filter),
    [filter],
  );

  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  const modal = selected
    ? createPortal(
      <div
        className="fixed inset-0 z-[10100] flex items-center justify-center p-4 bg-black/65"
        onClick={() => setSelected(null)}
        role="presentation"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="library-modal-title"
          className="relative w-full max-w-[min(90vw,540px)] max-h-[90vh] overflow-y-auto rounded-lg bg-[var(--color-background)] text-[var(--color-text)] shadow-xl p-6 pt-14"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-gray)] bg-[var(--color-background)] text-[var(--color-text)] transition-opacity hover:opacity-70"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2} aria-hidden />
          </button>
          <div className="mx-auto w-full max-w-[220px] overflow-hidden max-[935px]:max-w-[180px]">
            <div className="max-w-[220px] max-h-[330px] w-full aspect-[2/3] overflow-hidden max-[935px]:max-w-[180px] max-[935px]:max-h-[270px] max-[935px]:w-full max-[935px]:h-auto">
              <img
                className="block h-full w-full object-cover rounded-none"
                src={selected.coverImage}
                alt=""
                draggable={false}
              />
            </div>
          </div>
          <h2
            id="library-modal-title"
            className="mt-5 text-xl [font-variation-settings:'wght'_600]"
          >
            {selected.title}
          </h2>
          <div
            className="mt-2 flex gap-0.5"
            aria-label={`${selected.rating} out of 5 stars`}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={
                  i <= selected.rating
                    ? 'h-5 w-5 fill-[var(--color-text)] text-[var(--color-text)]'
                    : 'h-5 w-5 fill-transparent text-[var(--color-border-gray)]'
                }
                strokeWidth={1.25}
                aria-hidden
              />
            ))}
          </div>
          <p className="mt-4 text-base leading-relaxed [font-variation-settings:'wght'_400] whitespace-pre-line max-[935px]:text-[0.9rem]">
            {selected.review}
          </p>
        </div>
      </div>,
      document.body,
    )
    : null;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-5 mt-16 pb-16 max-[935px]:px-[4%]">
      <h2 className="text-[1.5rem] max-[935px]:text-[1.2rem] [font-variation-settings:'wght'_700] text-[var(--color-text-muted)]">
        LIBRARY
      </h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map(({ value, label }) => {
          const isActive = filter === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={
                isActive
                  ? 'rounded-[30px] px-4 py-1.5 text-sm [font-variation-settings:"wght"_500] bg-[var(--color-text)] text-[var(--color-background)] transition-colors'
                  : 'rounded-[30px] px-4 py-1.5 text-sm [font-variation-settings:"wght"_400] bg-[var(--color-keyword-bg)] text-[var(--color-keyword-text)] transition-colors hover:opacity-90'
              }
            >
              {label}
            </button>
          );
        })}
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 sm:gap-5 list-none p-0 m-0">
        {filteredItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="group w-full cursor-pointer border-0 bg-transparent p-0 text-left"
            >
              <div className="border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.98]">
                <div className="max-w-[320px] max-h-[480px] w-full aspect-[2/3] overflow-hidden max-[935px]:max-w-full max-[935px]:max-h-[360px] max-[935px]:w-full max-[935px]:h-auto">
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
      </ul>
      {modal}
    </div>
  );
}

export default Library;
