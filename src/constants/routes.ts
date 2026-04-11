// constants/routes.ts
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORKS: {
    ROOT: '/works',
    CAVEMAN: '/works/caveman',
    LOGO: '/works/logo',
  },
  ARCHIVE: {
    ROOT: '/archive',
    STUDIO: {
      ROOT: '/archive/studio',
      CHESO: '/archive/studio/cheso',
      PAINTBOX: '/archive/studio/paintbox',
      PAPERFOLD: '/archive/studio/paperfold',
      SAOPAULO: '/archive/studio/sao-paulo',
      LIGHTPAINTING: '/archive/studio/light-painting',
      INFINITYBOX: '/archive/studio/infinity-box',
    },
    EXPERIMENTS: {
      ROOT: '/archive/experiments',
      AGORA: '/archive/experiments/agora',
      DIGITALGARDEN: '/archive/experiments/digital-garden',
      ECHOINGNATURE: '/archive/experiments/echoing-nature',
      MACHINAANIMA: '/archive/experiments/machina-anima',
      LUCIDLIQUIDS: '/archive/experiments/lucid-liquids',
    },
  },
  PHOTOGRAPHY: 'https://filmbyko.cargo.site/',
} as const;

export const EXTERNAL_LINKS = {
  INSTAGRAM: 'https://www.instagram.com/morebyko/',
  LINKEDIN: 'https://www.linkedin.com/in/ericko26',
  ARENA: 'https://www.are.na/eric-ko/channels',
} as const;
