import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import '../global.css';

import { ROUTES } from '../constants/routes';
import {
  archiveEntries,
  type ArchiveCategory,
  type ArchiveEntry,
} from '../data/archive';
import ArchiveImage from '../components/ArchiveImage';
import ArchiveVideo from '../components/ArchiveVideo';
import VideoModal from '../components/VideoModal';
import Footer from '../components/Footer';

// Studio is temporarily hidden — MOTION and RENDERINGS are exposed in the UI.
// To restore the studio section, reintroduce the studio entry in FILTERS and the
// studio routes in App.tsx (see the comment there).
const FILTERS: { value: ArchiveCategory; label: string }[] = [
  { value: 'motion', label: 'MOTION' },
  { value: 'renderings', label: 'RENDERINGS' },
];

const FILTER_ROUTES: Record<'motion' | 'renderings', string> = {
  motion: ROUTES.ARCHIVE.MOTION.ROOT,
  renderings: ROUTES.ARCHIVE.RENDERINGS.ROOT,
};

const archiveFilterFade = {
  duration: 0.4,
  ease: [0.45, 0, 0.2, 1] as const,
};

function pathnameToFilter(pathname: string): ArchiveCategory {
  if (pathname.startsWith(ROUTES.ARCHIVE.RENDERINGS.ROOT)) {
    return 'renderings';
  }
  return 'motion';
}

function Archive() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<ArchiveEntry | null>(null);

  const filter = pathnameToFilter(location.pathname);

  const setFilter = (value: ArchiveCategory) => {
    if (value === 'motion' || value === 'renderings') {
      navigate(FILTER_ROUTES[value]);
    }
  };

  const filteredItems = useMemo(
    () => archiveEntries.filter((e) => e.category === filter),
    [filter],
  );

  const isRenderings = filter === 'renderings';

  return (
    <div className="bg-[var(--color-background)]">
      <section
        id="archive"
        className="w-full flex flex-col items-center bg-[var(--color-background)] pt-24 pb-20 max-mobile:pt-25 max-mobile:pb-10"
      >
        <div className="w-full px-[30px] max-mobile:px-[var(--page-padding-x-mobile)] mt-2 max-mobile:mt-0">
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            <div className="flex flex-wrap gap-2 max-mobile:flex-nowrap max-mobile:gap-1.5">
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Archive categories"
              >
                {FILTERS.map(({ value, label }) => {
                  const isActive = filter === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setFilter(value)}
                      className={`cursor-pointer rounded-[30px] px-4 py-1.5 text-sm [font-variation-settings:"wght"_400] transition-colors duration-250 ease-out max-mobile:px-3 max-mobile:text-xs ${
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
              <a
                href={ROUTES.PHOTOGRAPHY}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-[30px] px-4 py-1.5 text-sm [font-variation-settings:&quot;wght&quot;_400] bg-[var(--color-keyword-bg)] text-[var(--color-keyword-text)] transition-colors duration-250 ease-out hover:bg-[var(--color-text)] hover:text-[var(--color-background)] no-underline max-mobile:px-3 max-mobile:text-xs"
              >
                PHOTOGRAPHY
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1 inline-block h-[0.9em] w-[0.9em] shrink-0 align-[-0.06em]"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </a>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={filter}
            role="list"
            className={
              isRenderings
                ? 'mt-8 columns-3 gap-[15px] mx-auto overflow-hidden px-[30px] max-mobile:columns-2 max-mobile:px-[var(--page-padding-x-mobile)] max-mobile:py-0 list-none p-0 m-0 w-full'
                : 'mt-8 grid grid-cols-3 gap-[15px] justify-items-center mx-auto overflow-hidden px-[30px] max-mobile:grid-cols-1 max-mobile:px-[var(--page-padding-x-mobile)] max-mobile:py-0 list-none p-0 m-0 w-full'
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={archiveFilterFade}
          >
          {filteredItems.map((item) => {
            const isStudio = item.category === 'studio';
            const hasHref = Boolean(item.href) && !item.comingSoon;
            const hasModal = Boolean(item.modalVideoSrc);

            const studioMediaInner = (
              <div className="max-w-[810px] max-h-[540px] w-full h-auto overflow-hidden object-cover max-mobile:max-w-[750px] max-mobile:max-h-[500px]">
                {item.media.type === 'image' ? (
                  <img
                    className="block w-full h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110"
                    src={item.media.src}
                    alt={item.media.alt}
                    draggable={false}
                  />
                ) : (
                  <ArchiveVideo src={item.media.src} />
                )}
              </div>
            );

            const studioOuterClass = hasHref
              ? 'overflow-hidden transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[0.98]'
              : 'overflow-hidden';
            const studioFrame = <div className={studioOuterClass}>{studioMediaInner}</div>;

            const motionMedia = (
              <>
                {item.media.type === 'image' ? (
                  <img
                    className="block w-full h-full object-cover rounded-none"
                    src={item.media.src}
                    alt={item.media.alt}
                    draggable={false}
                  />
                ) : (
                  <ArchiveVideo src={item.media.src} />
                )}
              </>
            );

            const motionFrame = (
              <div className="flex w-full flex-col">
                <div
                  className={`border-2 border-transparent rounded-[8px] overflow-hidden ${
                    hasModal
                      ? 'transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[0.98]'
                      : ''
                  }`}
                >
                  <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-mobile:max-w-[750px] max-mobile:max-h-[500px] max-mobile:h-auto">
                    {motionMedia}
                  </div>
                </div>
                {item.description ? (
                  <div className="mt-2 flex items-start gap-1.5 text-[var(--color-keyword-text)]">
                    <span
                      aria-hidden
                      className="mt-[0.4em] shrink-0 border-x-[3.5px] border-b-[5px] border-x-transparent border-b-current"
                    />
                    <p className="text-xs [font-variation-settings:'wght'_400]">
                      {item.description}
                    </p>
                  </div>
                ) : null}
              </div>
            );

            const renderingsFrame = (
              <div className="border-2 border-transparent rounded-[8px] overflow-hidden">
                {item.media.type === 'image' ? (
                  <div className="w-full aspect-[4/5]">
                    <ArchiveImage src={item.media.src} alt={item.media.alt} />
                  </div>
                ) : (
                  <ArchiveVideo src={item.media.src} />
                )}
              </div>
            );

            const frame = isStudio
              ? studioFrame
              : isRenderings
                ? renderingsFrame
                : motionFrame;

            return (
              <li
                key={item.id}
                className={isRenderings ? 'break-inside-avoid mb-[15px]' : undefined}
              >
                {hasHref && item.href ? (
                  <Link to={item.href} className="block no-underline text-inherit">
                    {frame}
                  </Link>
                ) : hasModal ? (
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(item)}
                    className="block w-full cursor-pointer border-0 bg-transparent p-0 text-left text-inherit"
                    aria-label={`Play ${item.title}`}
                  >
                    {frame}
                  </button>
                ) : (
                  frame
                )}
              </li>
            );
          })}
          </motion.ul>
        </AnimatePresence>
      </section>
      <VideoModal entry={selectedVideo} onClose={() => setSelectedVideo(null)} />
      <Footer theme="light" />
    </div>
  );
}

export default Archive;
