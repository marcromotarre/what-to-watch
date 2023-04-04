import Score from "./Score";
import TMDB from "./TMDB";

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
  tmdb: TMDB;
  release_date: ReleaseDate;
}

export interface ReleaseDate {
  year: number;
  date: string;
}
