import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import '../global.css';

import { ROUTES } from '../constants/routes';
import {
  archiveEntries,
  type ArchiveCategory,
} from '../data/archive';
import Footer from '../components/Footer';
import Tooltip from '../components/Tooltip';

const FILTERS: { value: ArchiveCategory; label: string }[] = [
  { value: 'studio', label: 'STUDIO' },
  { value: 'experiments', label: 'EXPERIMENTS' },
];

const archiveFilterFade = {
  duration: 0.4,
  ease: [0.45, 0, 0.2, 1] as const,
};

function pathnameToFilter(pathname: string): 'all' | ArchiveCategory {
  if (pathname === ROUTES.ARCHIVE.STUDIO.ROOT) return 'studio';
  if (pathname === ROUTES.ARCHIVE.EXPERIMENTS.ROOT) return 'experiments';
  return 'all';
}

function Archive() {
  const location = useLocation();
  const navigate = useNavigate();

  const filter = pathnameToFilter(location.pathname);

  const setFilter = (value: ArchiveCategory) => {
    if (value === 'studio') navigate(ROUTES.ARCHIVE.STUDIO.ROOT);
    else navigate(ROUTES.ARCHIVE.EXPERIMENTS.ROOT);
  };

  const filteredItems = useMemo(
    () =>
      filter === 'all'
        ? archiveEntries
        : archiveEntries.filter((e) => e.category === filter),
    [filter],
  );

  return (
    <>
      <section
        id="archive"
        className="w-full flex flex-col items-center bg-[#fafafa] pt-24 pb-20 max-[935px]:pt-25 max-[935px]:pb-10"
      >
        <div className="w-full px-[30px] max-[935px]:px-[var(--page-padding-x-mobile)] mt-5">
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            <div className="flex flex-wrap gap-2 max-[935px]:flex-nowrap max-[935px]:gap-1.5">
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
                      className={`cursor-pointer rounded-[30px] px-4 py-1.5 text-sm [font-variation-settings:"wght"_400] transition-colors duration-250 ease-out max-[935px]:px-3 max-[935px]:text-xs ${
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
                className="cursor-pointer rounded-[30px] px-4 py-1.5 text-sm [font-variation-settings:&quot;wght&quot;_400] bg-[var(--color-keyword-bg)] text-[var(--color-keyword-text)] transition-colors duration-250 ease-out hover:bg-[var(--color-text)] hover:text-[var(--color-background)] no-underline max-[935px]:px-3 max-[935px]:text-xs"
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
            className="mt-8 grid grid-cols-3 gap-[15px] justify-items-center mx-auto overflow-hidden px-[30px] max-[935px]:grid-cols-1 max-[935px]:px-[var(--page-padding-x-mobile)] max-[935px]:py-0 list-none p-0 m-0 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={archiveFilterFade}
          >
            {filteredItems.map((item) => {
              const isStudio = item.category === 'studio';

              const studioFrame = (
                <div className="overflow-hidden">
                  <div className="max-w-[810px] max-h-[540px] w-full h-auto overflow-hidden object-cover max-[935px]:max-w-[750px] max-[935px]:max-h-[500px]">
                    {item.media.type === 'image' ? (
                      <img
                        className="block w-full h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110"
                        src={item.media.src}
                        alt={item.media.alt}
                        draggable={false}
                      />
                    ) : (
                      <video
                        className="block w-full h-full object-cover rounded-none"
                        playsInline
                        autoPlay
                        loop
                        muted
                        preload="auto"
                      >
                        <source src={item.media.src} type="video/mp4" />
                      </video>
                    )}
                  </div>
                </div>
              );

              const experimentsMedia = (
                <>
                  {item.media.type === 'image' ? (
                    <img
                      className="block w-full h-full object-cover rounded-none"
                      src={item.media.src}
                      alt={item.media.alt}
                      draggable={false}
                    />
                  ) : (
                    <video
                      className="block w-full h-full object-cover rounded-none"
                      playsInline
                      autoPlay
                      loop
                      muted
                      preload="auto"
                    >
                      <source src={item.media.src} type="video/mp4" />
                    </video>
                  )}
                </>
              );

              const experimentsOuterClass =
                item.href && !item.comingSoon
                  ? 'border-2 border-transparent rounded-[8px] overflow-hidden transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[0.98]'
                  : 'border-2 border-transparent rounded-[8px] overflow-hidden';

              const experimentsFrame = (
                <div className={experimentsOuterClass}>
                  <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                    {experimentsMedia}
                  </div>
                </div>
              );

              const frame = isStudio ? studioFrame : experimentsFrame;

              const inner =
                item.comingSoon ? (
                  <Tooltip content="Coming soon">{frame}</Tooltip>
                ) : (
                  frame
                );

              return (
                <li key={item.id}>
                  {item.href ? (
                    <Link to={item.href} className="block no-underline text-inherit">
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </section>
      <Footer theme="light" />
    </>
  );
}

export default Archive;
