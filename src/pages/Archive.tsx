import { useMemo } from 'react';
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
        className="w-full flex flex-col items-center bg-white pt-24 pb-20 max-[935px]:pt-10 max-[935px]:pb-[5px]"
      >
        <div className="w-full px-[30px] max-[935px]:px-[10px]">
          <div className="max-w-[1440px] mx-auto mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
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
              <a
                href={ROUTES.PHOTOGRAPHY}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[30px] px-4 py-1.5 text-sm [font-variation-settings:&quot;wght&quot;_400] bg-[var(--color-keyword-bg)] text-[var(--color-keyword-text)] transition-colors hover:opacity-90 no-underline"
              >
                PHOTOGRAPHY
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1 inline-block h-[0.9em] w-[0.9em] shrink-0 align-[-0.06em]"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </a>
            </div>
          </div>
        </div>

        <ul
            role="list"
            className="mt-8 grid grid-cols-3 gap-[15px] justify-items-center mx-auto overflow-hidden px-[30px] max-[935px]:grid-cols-1 max-[935px]:p-[10px] list-none p-0 m-0 w-full"
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
          </ul>
      </section>
      <Footer theme="light" />
    </>
  );
}

export default Archive;
