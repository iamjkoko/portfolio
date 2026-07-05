import { ROUTES } from '../constants/routes';
import { VIDEO_URLS } from '../constants/videos';

import Cheso from '../assets/images/archive/cheso/cheso.webp';
import InfinityBox from '../assets/images/archive/infinity-box/infinity-box.webp';
import Paintbox from '../assets/images/archive/paintbox/paintbox.webp';
import Paperfold from '../assets/images/archive/paperfold/paperfold.webp';
import SaoPaulo from '../assets/images/archive/sao-paulo/saopaulo.webp';
import LightPainting from '../assets/images/archive/light-painting/light-painting.webp';

{/*
import Placeholder from '../assets/images/background/placeholder-lt.png';
*/}

export type ArchiveCategory = 'studio' | 'experiments';

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

  // Experiments
  {
    id: 'chaotic-tiles',
    category: 'experiments',
    title: 'Chaotic Tiles',
    href: null,
    comingSoon: true,
    year: '2026',
    keywords: ['SHADER', 'TILES', 'CHAOS'],
    description:
      'A shader experiment creating a chaotic tile pattern with dynamic noise and movement.',
    media: { type: 'video', src: VIDEO_URLS.CHAOTIC_TILES },
  },
  {
    id: 'smth-abt-us',
    category: 'experiments',
    title: 'Something About Us',
    href: null,
    comingSoon: true,
    year: '2026',
    keywords: ['GENERATIVE', 'MOTION', 'AUDIO'],
    description:
      'A generative motion study exploring rhythm and repetition through abstract visual forms synced to ambient sound.',
    media: { type: 'video', src: VIDEO_URLS.SOMETHING_ABOUT_US },
  },
  {
    id: 'img-to-ptcloud',
    category: 'experiments',
    title: 'Image to Point Cloud',
    href: null,
    comingSoon: true,
    year: '2026',
    keywords: ['POINT CLOUD', 'DEPTH', '3D'],
    description:
      'Converts flat images into spatial point clouds, revealing depth and structure through particle-based rendering.',
    media: { type: 'video', src: VIDEO_URLS.IMG_TO_PTCLOUD },
  },
  {
    id: 'fluid-ticks',
    category: 'experiments',
    title: 'Fluid Ticks',
    href: null,
    comingSoon: true,
    year: '2025',
    keywords: ['FLUID SIM', 'PARTICLES', 'REAL-TIME'],
    description:
      'Real-time fluid simulation driven by discrete tick events, producing organic motion from minimal input.',
    media: { type: 'video', src: VIDEO_URLS.FLUID_TICKS },
  },
  {
    id: 'echoing-nature',
    category: 'experiments',
    title: 'Echoing Nature',
    href: null,
    comingSoon: true,
    year: '2025',
    keywords: ['NATURE', 'SOUND', 'GENERATIVE'],
    description:
      'Generative visuals that respond to natural soundscapes, translating environmental audio into flowing organic forms.',
    media: { type: 'video', src: VIDEO_URLS.ECHOING_NATURE },
  },
  {
    id: 'wormhole',
    category: 'experiments',
    title: 'Wormhole',
    href: null,
    comingSoon: true,
    year: '2025',
    keywords: ['SHADER', 'SPACE', 'DISTORTION'],
    description:
      'A shader experiment simulating gravitational lensing and spatial distortion through a traversable wormhole.',
    media: { type: 'video', src: VIDEO_URLS.WORMHOLE },
  },
];
