import libraryCoverPlaceholder from '../assets/images/background/placeholder-lt.png';

import filmNoOtherChoice from '../assets/images/library/films/no-other-choice.webp';
import filmRentalFamily from '../assets/images/library/films/rental-family.webp';
import filmTheBrutalist from '../assets/images/library/films/the-brutalist.webp';
import filmEEAAO from '../assets/images/library/films/eeaao.webp';
import filmOneBattleAfterAnother from '../assets/images/library/films/one-battle-after-another.webp';

import musicBlonde from '../assets/images/library/music/blonde.webp';
import musicDonda from '../assets/images/library/music/donda.webp';
import musicHowDeepIsYourLove from '../assets/images/library/music/how-deep-is-your-love.webp';
import musicRodeo from '../assets/images/library/music/rodeo.webp';
import musicDieLit from '../assets/images/library/music/die-lit.webp';
import musicChetBakerSings from '../assets/images/library/music/chet-baker-sings.webp';
import musicDepacseOhw from '../assets/images/library/music/depacse-ohw.webp';
import musicIKnowNigo from '../assets/images/library/music/i-know-nigo.webp';
import musicLegend from '../assets/images/library/music/legend.webp';
import musicLateLateSummer from '../assets/images/library/music/late-late-summer.webp';

export type LibraryCategory = 'book' | 'film' | 'music';

export type LibraryEntry = {
  id: string;
  title: string;
  author: string;
  year: number;
  category: LibraryCategory;
  coverImage: string;
  rating: number;
  review: string;
};

export const libraryEntries: LibraryEntry[] = [
  
  // Films
  {
    id: 'film-1',
    title: 'One Battle After Another',
    author: 'Paul Thomas Anderson',
    year: 2025,
    category: 'film',
    coverImage: filmOneBattleAfterAnother,
    rating: 5,
    review: 'Description',
  },
  {
    id: 'film-2',
    title: 'No Other Choice',
    author: 'Park Chan-wook',
    year: 2025,
    category: 'film',
    coverImage: filmNoOtherChoice,
    rating: 4,
    review: 'Description',
  },
  {
    id: 'film-3',
    title: 'Rental Family',
    author: 'Hikari',
    year: 2025,
    category: 'film',
    coverImage: filmRentalFamily,
    rating: 3.5,
    review: 'Description',
  },
  {
    id: 'film-4',
    title: 'Everything Everywhere All at Once',
    author: 'Daniel Kwan & Daniel Scheinert',
    year: 2022,
    category: 'film',
    coverImage: filmEEAAO,
    rating: 5,
    review: 'Description',
  },
  {
    id: 'film-5',
    title: 'The Brutalist',
    author: 'Brady Corbet',
    year: 2024,
    category: 'film',
    coverImage: filmTheBrutalist,
    rating: 4,
    review: 'Description',
  },


  // Music
  {
    id: 'music-1',
    title: 'Blonde',
    author: 'Frank Ocean',
    year: 2016,
    category: 'music',
    coverImage: musicBlonde,
    rating: 4,
    review: 'Description',
  },
  {
    id: 'music-2',
    title: 'Donda',
    author: 'Kanye West',
    year: 2021,
    category: 'music',
    coverImage: musicDonda,
    rating: 5,
    review: 'Description',
  },
  {
    id: 'music-3',
    title: 'How Deep Is Your Love',
    author: 'Dress',
    year: 2024,
    category: 'music',
    coverImage: musicHowDeepIsYourLove,
    rating: 3.5,
    review: 'Description',
  },
  {
    id: 'music-4',
    title: 'Rodeo',
    author: 'Travis Scott',
    year: 2015,
    category: 'music',
    coverImage: musicRodeo,
    rating: 4.5,
    review: 'Description',
  },
  {
    id: 'music-5',
    title: 'Die Lit',
    author: 'Playboi Carti',
    year: 2018,
    category: 'music',
    coverImage: musicDieLit,
    rating: 4,
    review: 'Description',
  },
  {
    id: 'music-6',
    title: 'Chet Baker Sings',
    author: 'Chet Baker',
    year: 2019,
    category: 'music',
    coverImage: musicChetBakerSings,
    rating: 4,
    review: 'Description',
  },
  {
    id: 'music-7',
    title: 'Depacse Ohw',
    author: 'Seori',
    year: 2020,
    category: 'music',
    coverImage: musicDepacseOhw,
    rating: 3,
    review: 'Description',
  },
  {
    id: 'music-8',
    title: 'I Know Nigo',
    author: 'Nigo',
    year: 2021,
    category: 'music',
    coverImage: musicIKnowNigo,
    rating: 3,
    review: 'Description',
  },
  {
    id: 'music-9',
    title: 'Legend',
    author: 'Jannabi',
    year: 2022,
    category: 'music',
    coverImage: musicLegend,
    rating: 4.5,
    review: 'Description',
  },
  {
    id: 'music-10',
    title: 'Late Late Summer',
    author: 'Bread and Butter',
    year: 2023,
    category: 'music',
    coverImage: musicLateLateSummer,
    rating: 3,
    review: 'Description',
  },


  // Books
  {
    id: 'book-1',
    title: 'Title',
    author: 'Author',
    year: 2020,
    category: 'book',
    coverImage: libraryCoverPlaceholder,
    rating: 5,
    review: 'Description',
  },
  {
    id: 'book-2',
    title: 'Title',
    author: 'Author',
    year: 2021,
    category: 'book',
    coverImage: libraryCoverPlaceholder,
    rating: 4,
    review: 'Description',
  },
  {
    id: 'book-3',
    title: 'Title',
    author: 'Author',
    year: 2022,
    category: 'book',
    coverImage: libraryCoverPlaceholder,
    rating: 3,
    review: 'Description',
  },
];
