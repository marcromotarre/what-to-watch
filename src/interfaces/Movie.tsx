import Score from "./Score";
import TMDB from "./TMDB";
import IMDB from "./IMDB";

export default interface Movie {
  id: number;
  title: string;
  original_title: string;
  runtime: number;
  poster_path: string;
  genres: Array<number>;
  cast: Array<number>;
  directors: Array<number>;
  IMDB: IMDB;
  FILMAFFINITY: Score;
  platforms: Array<string>;
  TMDB: TMDB;
  release_date: ReleaseDate;
}

export interface ReleaseDate {
  year: number;
  date: string;
}
