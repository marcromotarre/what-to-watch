import Score from "./Score";

export default interface Movie {
  id: number;
  title: string;
  original_title: string;
  runtime: number;
  poster_path: string;
  genres: Array<number>;
  cast: Array<number>;
  directors: Array<number>;
  imdb: Score;
  filmaffinity: Score;
  platforms: Array<string>;
  popularity: number;
  tmdb: Score;
  release_date: ReleaseDate;
}

export interface ReleaseDate {
  year: number;
  date: string;
}
