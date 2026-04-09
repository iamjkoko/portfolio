import libraryCoverPlaceholder from '../assets/images/background/placeholder-lt.png';

export type LibraryCategory = 'book' | 'film' | 'tv' | 'music';

export type LibraryEntry = {
  id: string;
  title: string;
  category: LibraryCategory;
  /** Vite-resolved cover asset URL (placeholder until real art is added) */
  coverImage: string;
  /** Whole stars, 1–5 */
  rating: number;
  review: string;
};

export const libraryEntries: LibraryEntry[] = [
  {
    id: 'book-1',
    title: 'Placeholder Novel One',
    category: 'book',
    coverImage: libraryCoverPlaceholder,
    rating: 5,
    review:
      'A stand-in review for layout testing. The prose is imaginary; the grid is real.\n\nSecond paragraph to check scroll behavior in the modal when copy runs long.',
  },
  {
    id: 'book-2',
    title: 'Placeholder Essays',
    category: 'book',
    coverImage: libraryCoverPlaceholder,
    rating: 4,
    review: 'Short placeholder blurb. Replace with a real title and your notes.',
  },
  {
    id: 'book-3',
    title: 'Placeholder Memoir',
    category: 'book',
    coverImage: libraryCoverPlaceholder,
    rating: 3,
    review: 'Another dummy book entry to fill the Books filter.',
  },
  {
    id: 'film-1',
    title: 'Placeholder Film Alpha',
    category: 'film',
    coverImage: libraryCoverPlaceholder,
    rating: 5,
    review: 'Dummy film notes. Cinematography, pacing, sound—describe what moved you.',
  },
  {
    id: 'film-2',
    title: 'Placeholder Film Beta',
    category: 'film',
    coverImage: libraryCoverPlaceholder,
    rating: 4,
    review: 'Second film placeholder for the grid.',
  },
  {
    id: 'film-3',
    title: 'Placeholder Film Gamma',
    category: 'film',
    coverImage: libraryCoverPlaceholder,
    rating: 2,
    review: 'A lower rating example to test the star row.',
  },
  {
    id: 'tv-1',
    title: 'Placeholder Series One',
    category: 'tv',
    coverImage: libraryCoverPlaceholder,
    rating: 5,
    review: 'TV placeholder. Season arcs, characters, standout episodes—your call.',
  },
  {
    id: 'tv-2',
    title: 'Placeholder Series Two',
    category: 'tv',
    coverImage: libraryCoverPlaceholder,
    rating: 4,
    review: 'Another series stub for filtering.',
  },
  {
    id: 'tv-3',
    title: 'Placeholder Limited Series',
    category: 'tv',
    coverImage: libraryCoverPlaceholder,
    rating: 4,
    review: 'Limited run placeholder.',
  },
  {
    id: 'music-1',
    title: 'Placeholder Album A',
    category: 'music',
    coverImage: libraryCoverPlaceholder,
    rating: 5,
    review: 'Album notes placeholder: favorite tracks, production, mood.',
  },
  {
    id: 'music-2',
    title: 'Placeholder Album B',
    category: 'music',
    coverImage: libraryCoverPlaceholder,
    rating: 3,
    review: 'Second album stub.',
  },
  {
    id: 'music-3',
    title: 'Placeholder EP',
    category: 'music',
    coverImage: libraryCoverPlaceholder,
    rating: 4,
    review: 'EP placeholder for the Music tab.',
  },
];
