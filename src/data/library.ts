import filmNoOtherChoice from '../assets/images/library/films/no-other-choice.webp';
import filmRentalFamily from '../assets/images/library/films/rental-family.webp';
import filmTheBrutalist from '../assets/images/library/films/the-brutalist.webp';
import filmEEAAO from '../assets/images/library/films/eeaao.webp';
import filmOneBattleAfterAnother from '../assets/images/library/films/one-battle-after-another.webp';
import filmArrival from '../assets/images/library/films/arrival.webp';
import filmDuneTwo from '../assets/images/library/films/dune-two.webp';
import filmInterstellar from '../assets/images/library/films/interstellar.webp';
import filmLaLaLand from '../assets/images/library/films/lalaland.webp';
import filmOppenheimer from '../assets/images/library/films/oppenheimer.webp';
import filmProjectHailMary from '../assets/images/library/films/project-hail-mary.webp';
import filmTheBoyAndHeron from '../assets/images/library/films/the-boy-and-heron.webp';
import filmTenet from '../assets/images/library/films/tenet.webp';
import filmBulletTrain from '../assets/images/library/films/bullet-train.webp';
import filmSnowpiercer from '../assets/images/library/films/snowpiercer.webp';
import filmGrandBudapestHotel from '../assets/images/library/films/grand-budapest-hotel.webp';

import musicBlonde from '../assets/images/library/music/blonde.webp';
import musicDonda from '../assets/images/library/music/donda.webp';
import musicHowDeepIsYourLove from '../assets/images/library/music/how-deep-is-your-love.webp';
import musicRodeo from '../assets/images/library/music/rodeo.webp';
import musicDieLit from '../assets/images/library/music/die-lit.webp';
import musicChetBakerSings from '../assets/images/library/music/chet-baker-sings.webp';
import musicDepacseOhw from '../assets/images/library/music/depacse-ohw.webp';
import musicIKnowNigo from '../assets/images/library/music/i-know-nigo.webp';
import musicLegend from '../assets/images/library/music/legend.webp';
import music24kMagic from '../assets/images/library/music/24k-magic.webp';
import music130Mood from '../assets/images/library/music/130-mood.webp';
import musicFunkWaveBounces from '../assets/images/library/music/funk-wave-bounces.webp';
import musicGetzGilberto from '../assets/images/library/music/getz-gilberto.webp';
import musicHer from '../assets/images/library/music/her.webp';
import musicTimely from '../assets/images/library/music/timely.webp';

import bookSteveJobs from '../assets/images/library/books/steve-jobs.webp';
import bookTheCamphorKeeper from '../assets/images/library/books/the-camphor-keeper.webp';

export type LibraryCategory = 'film' | 'music' | 'book';

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
    id: 'film-9',
    title: 'La La Land',
    author: 'Damien Chazelle',
    year: 2016,
    category: 'film',
    coverImage: filmLaLaLand,
    rating: 5,
    review: '',
  },
  {
    id: 'film-1',
    title: 'One Battle After Another',
    author: 'Paul Thomas Anderson',
    year: 2025,
    category: 'film',
    coverImage: filmOneBattleAfterAnother,
    rating: 5,
    review: '',
  },
  {
    id: 'film-4',
    title: 'Everything Everywhere All at Once',
    author: 'Daniel Kwan & Daniel Scheinert',
    year: 2022,
    category: 'film',
    coverImage: filmEEAAO,
    rating: 5,
    review: '',
  },
  {
    id: 'film-7',
    title: 'Dune: Part Two',
    author: 'Denis Villeneuve',
    year: 2024,
    category: 'film',
    coverImage: filmDuneTwo,
    rating: 4.5,
    review: '',
  },
  {
    id: 'film-6',
    title: 'Tenet',
    author: 'Christopher Nolan',
    year: 2020,
    category: 'film',
    coverImage: filmTenet,
    rating: 4.5,
    review: '',
  },
  {
    id: 'film-11',
    title: 'Oppenheimer',
    author: 'Christopher Nolan',
    year: 2023,
    category: 'film',
    coverImage: filmOppenheimer,
    rating: 4.5,
    review: '',
  },
  {
    id: 'film-14',
    title: 'The Grand Budapest Hotel',
    author: 'Wes Anderson',
    year: 2014,
    category: 'film',
    coverImage: filmGrandBudapestHotel,
    rating: 4.5,
    review: '',
  },
  {
    id: 'film-8',
    title: 'Interstellar',
    author: 'Christopher Nolan',
    year: 2014,
    category: 'film',
    coverImage: filmInterstellar,
    rating: 4.5,
    review: '',
  },
  {
    id: 'film-6',
    title: 'Arrival',
    author: 'Denis Villeneuve',
    year: 2016,
    category: 'film',
    coverImage: filmArrival,
    rating: 4.5,
    review: '',
  },
  {
    id: 'film-2',
    title: 'No Other Choice',
    author: 'Park Chan-wook',
    year: 2025,
    category: 'film',
    coverImage: filmNoOtherChoice,
    rating: 4,
    review: '',
  },
  {
    id: 'film-5',
    title: 'The Brutalist',
    author: 'Brady Corbet',
    year: 2024,
    category: 'film',
    coverImage: filmTheBrutalist,
    rating: 4,
    review: '',
  },
  {
    id: 'film-3',
    title: 'Rental Family',
    author: 'Hikari',
    year: 2025,
    category: 'film',
    coverImage: filmRentalFamily,
    rating: 3,
    review: '',
  },
  {
    id: 'film-13',
    title: 'The Boy and the Heron',
    author: 'Miyazaki Hayao',
    year: 2023,
    category: 'film',
    coverImage: filmTheBoyAndHeron,
    rating: 3,
    review: '',
  },
  {
    id: 'film-12',
    title: 'Project Hail Mary',
    author: 'Phil Lord, Chris Miller',
    year: 2026,
    category: 'film',
    coverImage: filmProjectHailMary,
    rating: 3,
    review: '',
  },
  {
    id: 'film-17',
    title: 'Snowpiercer',
    author: 'Bong Joon-ho',
    year: 2013,
    category: 'film',
    coverImage: filmSnowpiercer,
    rating: 3,
    review: '',
  },
  {
    id: 'film-15',
    title: 'Bullet Train',
    author: 'David Leitch',
    year: 2022,
    category: 'film',
    coverImage: filmBulletTrain,
    rating: 2.5,
    review: '',
  },


  // Music
  {
    id: 'music-2',
    title: 'Donda',
    author: 'Kanye West',
    year: 2021,
    category: 'music',
    coverImage: musicDonda,
    rating: 5,
    review: '',
  },
  {
    id: 'music-9',
    title: 'Legend',
    author: 'Jannabi',
    year: 2022,
    category: 'music',
    coverImage: musicLegend,
    rating: 5,
    review: '',
  },
  {
    id: 'music-1',
    title: 'Blonde',
    author: 'Frank Ocean',
    year: 2016,
    category: 'music',
    coverImage: musicBlonde,
    rating: 4.5,
    review: '',
  },
  {
    id: 'music-4',
    title: 'Rodeo',
    author: 'Travis Scott',
    year: 2015,
    category: 'music',
    coverImage: musicRodeo,
    rating: 4.5,
    review: '',
  },
  {
    id: 'music-11',
    title: '24K Magic',
    author: 'Bruno Mars',
    year: 2016,
    category: 'music',
    coverImage: music24kMagic,
    rating: 4.5,
    review: '',
  },
  {
    id: 'music-14',
    title: 'Getz/Gilberto',
    author: 'Stan Getz, João Gilberto',
    year: 1964,
    category: 'music',
    coverImage: musicGetzGilberto,
    rating: 4.5,
    review: '',
  },
  {
    id: 'music-12',
    title: '130 Mood: TRBL',
    author: 'Dean',
    year: 2016,
    category: 'music',
    coverImage: music130Mood,
    rating: 3.5,
    review: '',
  },
  {
    id: 'music-5',
    title: 'Die Lit',
    author: 'Playboi Carti',
    year: 2018,
    category: 'music',
    coverImage: musicDieLit,
    rating: 3.5,
    review: '',
  },
  {
    id: 'music-6',
    title: 'Chet Baker Sings',
    author: 'Chet Baker',
    year: 2019,
    category: 'music',
    coverImage: musicChetBakerSings,
    rating: 3.5,
    review: '',
  },
  {
    id: 'music-18',
    title: 'Timely',
    author: 'Anri',
    year: 1983,
    category: 'music',
    coverImage: musicTimely,
    rating: 3.5,
    review: '',
  },
  {
    id: 'music-3',
    title: 'How Deep Is Your Love',
    author: 'Dress',
    year: 2024,
    category: 'music',
    coverImage: musicHowDeepIsYourLove,
    rating: 3.5,
    review: '',
  },
  {
    id: 'music-13',
    title: 'Funk Wave Bounces Vol. 1',
    author: 'Calvin Harris',
    year: 2017,
    category: 'music',
    coverImage: musicFunkWaveBounces,
    rating: 3.5,
    review: '',
  },
  {
    id: 'music-16',
    title: 'Her',
    author: 'DPR Live',
    year: 2017,
    category: 'music',
    coverImage: musicHer,
    rating: 3.5,
    review: '',
  },
  {
    id: 'music-8',
    title: 'I Know Nigo',
    author: 'Nigo',
    year: 2021,
    category: 'music',
    coverImage: musicIKnowNigo,
    rating: 3,
    review: '',
  },
  {
    id: 'music-7',
    title: '?Depacse Ohw',
    author: 'Seori',
    year: 2020,
    category: 'music',
    coverImage: musicDepacseOhw,
    rating: 3,
    review: '',
  },


  // Books
  {
    id: 'book-1',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    year: 2011,
    category: 'book',
    coverImage: bookSteveJobs,
    rating: 4,
    review: '',
  },
  {
    id: 'book-2',
    title: 'The Camphor Keeper',
    author: 'Keigo Higashino',
    year: 2020,
    category: 'book',
    coverImage: bookTheCamphorKeeper,
    rating: 2.5,
    review: '',
  },
];
