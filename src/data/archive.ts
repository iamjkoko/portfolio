import { ROUTES } from '../constants/routes';
import { VIDEO_URLS } from '../constants/videos';

import Cheso from '../assets/images/archive/cheso/cheso.webp';
import InfinityBox from '../assets/images/archive/infinity-box/infinity-box.webp';
import Paintbox from '../assets/images/archive/paintbox/paintbox.webp';
import Paperfold from '../assets/images/archive/paperfold/paperfold.webp';
import SaoPaulo from '../assets/images/archive/sao-paulo/saopaulo.webp';
import LightPainting from '../assets/images/archive/light-painting/light-painting.webp';
import Placeholder from '../assets/images/background/placeholder-dk.png';

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
    id: 'smth-abt-us',
    category: 'experiments',
    title: 'Something About Us',
    href: null,
    media: { type: 'video', src: VIDEO_URLS.SOMETHING_ABOUT_US },
  },
  {
    id: 'img-to-ptcloud',
    category: 'experiments',
    title: 'Image to Point Cloud',
    href: null,
    media: { type: 'video', src: VIDEO_URLS.IMG_TO_PTCLOUD },
  },
  {
    id: 'fluid-ticks',
    category: 'experiments',
    title: 'Fluid Ticks',
    href: null,
    comingSoon: true,
    media: { type: 'video', src: VIDEO_URLS.FLUID_TICKS },
  },
  {
    id: 'echoing-nature',
    category: 'experiments',
    title: 'Echoing Nature',
    href: null,
    comingSoon: true,
    media: { type: 'video', src: VIDEO_URLS.ECHOING_NATURE },
  },
  {
    id: 'wormhole',
    category: 'experiments',
    title: 'Wormhole',
    href: null,
    media: { type: 'video', src: VIDEO_URLS.WORMHOLE },
  },
  {
    id: 'placeholder-4',
    category: 'experiments',
    title: '',
    href: null,
    media: { type: 'image', src: Placeholder, alt: '' },
  },
];
