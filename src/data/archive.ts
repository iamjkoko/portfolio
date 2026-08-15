import { ROUTES } from '../constants/routes';
import { VIDEO_URLS } from '../constants/videos';

import Cheso from '../assets/images/archive/cheso/cheso.webp';
import InfinityBox from '../assets/images/archive/infinity-box/infinity-box.webp';
import Paintbox from '../assets/images/archive/paintbox/paintbox.webp';
import Paperfold from '../assets/images/archive/paperfold/paperfold.webp';
import SaoPaulo from '../assets/images/archive/sao-paulo/saopaulo.webp';
import LightPainting from '../assets/images/archive/light-painting/light-painting.webp';

import Mj01 from '../assets/images/archive/renderings/mj-01.webp';
import Mj02 from '../assets/images/archive/renderings/mj-02.webp';
import Mj03 from '../assets/images/archive/renderings/mj-03.webp';
import Mj04 from '../assets/images/archive/renderings/mj-04.webp';
import Mj05 from '../assets/images/archive/renderings/mj-05.webp';
import Mj06 from '../assets/images/archive/renderings/mj-06.webp';

{/*
import Placeholder from '../assets/images/background/placeholder-lt.png';
*/}

export type ArchiveCategory = 'studio' | 'motion' | 'renderings';

export type ArchiveMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string };

export type ArchiveEntry = {
  id: string;
  category: ArchiveCategory;
  title: string;
  href: string | null;
  comingSoon?: boolean;
  year?: string;
  description?: string;
  keywords?: string[];
  media: ArchiveMedia;
  /** Full-quality video played in the archive modal. Entries with this set are clickable. */
  modalVideoSrc?: string;
};

export const archiveEntries: ArchiveEntry[] = [
  // Studio
  {
    id: 'infinity-box',
    category: 'studio',
    title: 'Infinity Box',
    href: ROUTES.ARCHIVE.STUDIO.INFINITYBOX,
    media: { type: 'image', src: InfinityBox, alt: 'Infinity Box' },
  },
  {
    id: 'paintbox',
    category: 'studio',
    title: 'Paintbox',
    href: ROUTES.ARCHIVE.STUDIO.PAINTBOX,
    media: { type: 'image', src: Paintbox, alt: 'Paintbox' },
  },
  {
    id: 'paperfold',
    category: 'studio',
    title: 'Paperfold',
    href: ROUTES.ARCHIVE.STUDIO.PAPERFOLD,
    media: { type: 'image', src: Paperfold, alt: 'Paperfold' },
  },
  {
    id: 'cheso',
    category: 'studio',
    title: 'Cheso',
    href: ROUTES.ARCHIVE.STUDIO.CHESO,
    media: { type: 'image', src: Cheso, alt: 'Cheso' },
  },
  {
    id: 'sao-paulo',
    category: 'studio',
    title: 'São Paulo',
    href: ROUTES.ARCHIVE.STUDIO.SAOPAULO,
    media: { type: 'image', src: SaoPaulo, alt: 'São Paulo' },
  },
  {
    id: 'light-painting',
    category: 'studio',
    title: 'Light Painting',
    href: ROUTES.ARCHIVE.STUDIO.LIGHTPAINTING,
    media: { type: 'image', src: LightPainting, alt: 'Light Painting' },
  },

  // Motion
  {
    id: 'chaotic-tiles',
    category: 'motion',
    title: 'Chaotic Tiles',
    href: null,
    comingSoon: true,
    year: '2026',
    keywords: ['SHADER', 'TILES', 'CHAOS'],
    description:
      'Random fractal patterns made with instancing + noise TOPs in TouchDesigner.',
    media: { type: 'video', src: VIDEO_URLS.CHAOTIC_TILES },
  },
  {
    id: 'smth-abt-us',
    category: 'motion',
    title: 'Something About Us',
    href: null,
    comingSoon: true,
    year: '2026',
    keywords: ['GENERATIVE', 'MOTION', 'AUDIO'],
    description:
      'A generative motion project exploring rhythm and repetition through abstract visual forms synced to ambient sound, music by Daft Punk (Something About Us).',
    media: { type: 'video', src: VIDEO_URLS.SOMETHING_ABOUT_US },
    modalVideoSrc: VIDEO_URLS.SOMETHING_ABOUT_US_FULL,
  },
  {
    id: 'img-to-ptcloud',
    category: 'motion',
    title: 'Image to Point Cloud',
    href: null,
    comingSoon: true,
    year: '2026',
    keywords: ['POINT CLOUD', 'DEPTH', '3D'],
    description:
      'Simulating conversion of flat images into spatial point clouds, revealing depth and structure through particle-based rendering.',
    media: { type: 'video', src: VIDEO_URLS.IMG_TO_PTCLOUD },
  },
  {
    id: 'fluid-ticks',
    category: 'motion',
    title: 'Fluid Ticks',
    href: null,
    comingSoon: true,
    year: '2025',
    keywords: ['FLUID SIM', 'PARTICLES', 'REAL-TIME'],
    description:
      'Real-time fluid animation made in TouchDesigner, producing organic motion from minimal input.',
    media: { type: 'video', src: VIDEO_URLS.FLUID_TICKS },
  },
  {
    id: 'echoing-nature',
    category: 'motion',
    title: 'Echoing Nature',
    href: null,
    comingSoon: true,
    year: '2025',
    keywords: ['NATURE', 'SOUND', 'GENERATIVE'],
    description:
      'Generative visuals that respond to natural soundscapes, translating environmental audio into flowing organic forms. Audio is recorded in a small village garden in Richeliu, France.',
    media: { type: 'video', src: VIDEO_URLS.ECHOING_NATURE },
    modalVideoSrc: VIDEO_URLS.ECHOING_NATURE_FULL,
  },
  {
    id: 'wormhole',
    category: 'motion',
    title: 'Wormhole',
    href: null,
    comingSoon: true,
    year: '2025',
    keywords: ['SHADER', 'SPACE', 'DISTORTION'],
    description:
      'A shader experiment simulating gravitational lensing and spatial distortion through a traversable wormhole.',
    media: { type: 'video', src: VIDEO_URLS.WORMHOLE },
  },

  // Renderings (CSS columns fill top-to-bottom per column)
  {
    id: 'mj-01',
    category: 'renderings',
    title: 'Rendering 01',
    href: null,
    media: { type: 'image', src: Mj01, alt: 'Abstract rendering study 01' },
  },
  {
    id: 'mj-04',
    category: 'renderings',
    title: 'Rendering 04',
    href: null,
    media: { type: 'image', src: Mj04, alt: 'Abstract rendering study 04' },
  },
  {
    id: 'mj-02',
    category: 'renderings',
    title: 'Rendering 02',
    href: null,
    media: { type: 'image', src: Mj02, alt: 'Abstract rendering study 02' },
  },
  {
    id: 'mj-05',
    category: 'renderings',
    title: 'Rendering 05',
    href: null,
    media: { type: 'image', src: Mj05, alt: 'Abstract rendering study 05' },
  },
  {
    id: 'mj-03',
    category: 'renderings',
    title: 'Rendering 03',
    href: null,
    media: { type: 'image', src: Mj03, alt: 'Abstract rendering study 03' },
  },
  {
    id: 'mj-06',
    category: 'renderings',
    title: 'Rendering 06',
    href: null,
    media: { type: 'image', src: Mj06, alt: 'Abstract rendering study 06' },
  },
];
