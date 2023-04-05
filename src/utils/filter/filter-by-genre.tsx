import Movie from "@/interfaces/Movie";
import { EVERY } from "./filter-constsants";

export const filter_by_genre = ({
  movies,
  genres,
  filter_type,
}: {
  movies: Array<Movie>;
  genres: Array<number>;
  filter_type: string;
}): Array<Movie> => {
  return movies.filter((movie: Movie) => {
    const is_included = genres.map((genre) => movie.genres.includes(genre));
    if ((filter_type = EVERY)) {
      return is_included.every(Boolean);
    } else {
      return is_included.some(Boolean);
    }
  });
};
