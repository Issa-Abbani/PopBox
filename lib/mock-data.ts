export type MovieCastMember = {
  name: string;
  character: string;
  avatar: string;
};

export type Movie = {
  id: string;
  title: string;
  year: number;
  runtime: string;
  rating: number;
  poster: string;
  backdrop: string;
  genres: string[];
  summary: string;
  releaseDate: string;
  cast: MovieCastMember[];
  personalRating?: number;
  notes?: string;
  favorite: boolean;
  watchlist: boolean;
  watched: boolean;
};

export const movies: Movie[] = [
  {
    id: "midnight-echo",
    title: "Midnight Echo",
    year: 2024,
    runtime: "2h 14m",
    rating: 8.7,
    poster:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
    genres: ["Thriller", "Sci-Fi", "Drama"],
    summary:
      "A reclusive sound designer uncovers a hidden transmission that predicts catastrophic events across the city, forcing him to decide whether to expose the truth or protect the ones he loves.",
    releaseDate: "May 17, 2024",
    cast: [
      { name: "Elena Ross", character: "Mara Vale", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" },
      { name: "Noah Blake", character: "Theo Finch", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
      { name: "Sofia Rhee", character: "Jin Park", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80" },
    ],
    personalRating: 9,
    notes: "A moody, clever thriller with a striking soundtrack and a big emotional payoff.",
    favorite: true,
    watchlist: false,
    watched: true,
  },
  {
    id: "sunset-archives",
    title: "Sunset Archives",
    year: 2023,
    runtime: "1h 58m",
    rating: 8.2,
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    genres: ["Mystery", "Adventure"],
    summary:
      "When an archivist discovers a missing reel of footage showing a city that no longer exists, she races through time to uncover the secret behind its disappearance.",
    releaseDate: "November 10, 2023",
    cast: [
      { name: "Lena Ward", character: "Iris Sol", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" },
      { name: "Marcus Hill", character: "Cal Drake", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" },
      { name: "Ava Brooks", character: "Tess York", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" },
    ],
    personalRating: 8,
    notes: "Beautiful visuals, layered timeline logic, and a deeply human core.",
    favorite: true,
    watchlist: true,
    watched: false,
  },
  {
    id: "velvet-parade",
    title: "Velvet Parade",
    year: 2022,
    runtime: "2h 05m",
    rating: 7.9,
    poster:
      "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1600&q=80",
    genres: ["Drama", "Romance"],
    summary:
      "A gifted stage performer and a meticulous event planner collide during the final week of the city’s most extravagant festival, forcing them to reconsider what success really means.",
    releaseDate: "September 2, 2022",
    cast: [
      { name: "Cora Meyers", character: "Dahlia Quinn", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80" },
      { name: "Julian Cross", character: "Nate Ford", avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80" },
      { name: "Piper Lane", character: "Rhea Bell", avatar: "https://images.unsplash.com/photo-1549068106-b024baf5062d?auto=format&fit=crop&w=300&q=80" },
    ],
    personalRating: 7,
    notes: "Feels like a warm, glittering night with a sharp emotional edge.",
    favorite: false,
    watchlist: true,
    watched: true,
  },
  {
    id: "harbor-of-saints",
    title: "Harbor of Saints",
    year: 2024,
    runtime: "2h 21m",
    rating: 9.1,
    poster:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80",
    genres: ["Crime", "Action"],
    summary:
      "In a city ruled by secrets and shifting alliances, a disgraced investigator must protect a witness who may be the key to ending an empire built on blood and silence.",
    releaseDate: "June 28, 2024",
    cast: [
      { name: "Daniel Cross", character: "Eli Voss", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
      { name: "Mila Sato", character: "Rae Kwon", avatar: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=300&q=80" },
      { name: "Henry Vale", character: "Jon Mercer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
    ],
    personalRating: 9,
    notes: "Lean, intense, and beautifully paced; one of my favorites this year.",
    favorite: true,
    watchlist: false,
    watched: true,
  },
  {
    id: "glass-forest",
    title: "Glass Forest",
    year: 2021,
    runtime: "1h 47m",
    rating: 7.6,
    poster:
      "https://images.unsplash.com/photo-1522856339183-9a7ad2c247e4?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    genres: ["Fantasy", "Adventure"],
    summary:
      "A young mapmaker discovers a hidden valley suspended between storms, where the trees hum with memories and every path can rewrite the past.",
    releaseDate: "March 12, 2021",
    cast: [
      { name: "Zoe Finch", character: "Nia Vale", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80" },
      { name: "Leo Hart", character: "Rowan Reed", avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80" },
      { name: "Nora Wren", character: "Sera Vale", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80" },
    ],
    personalRating: 8,
    notes: "Visually gorgeous with a gentle emotional arc and a standout score.",
    favorite: true,
    watchlist: true,
    watched: false,
  },
  {
    id: "northline",
    title: "Northline",
    year: 2024,
    runtime: "1h 51m",
    rating: 8.4,
    poster:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80",
    genres: ["Drama", "Mystery"],
    summary:
      "After a frozen highway collapse leaves a town cut off from the world, a local teacher uncovers a conspiracy hidden beneath the snow line.",
    releaseDate: "January 19, 2024",
    cast: [
      { name: "Aria Holt", character: "Mina Wells", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" },
      { name: "Cole Pratt", character: "Drew Ash", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
      { name: "Luca Grant", character: "Ezra Stone", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" },
    ],
    personalRating: 8,
    notes: "An atmospheric suspense film with stunning winter compositions.",
    favorite: false,
    watchlist: true,
    watched: true,
  },
];

export const featuredMovie = movies[0];
export const collectionMovies = movies.filter((movie) => movie.watchlist || movie.favorite || movie.watched);
