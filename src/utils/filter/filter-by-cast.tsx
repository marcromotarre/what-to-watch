import Movie from "@/interfaces/Movie";
import { EVERY } from "./filter-constsants";

export const filter_by_cast = ({
  movies,
  cast,
  filter_type,
}: {
  movies: Array<Movie>;
  cast: Array<number>;
  filter_type: string;
}): Array<Movie> => {
  return movies.filter((movie: Movie) => {
    const is_included = cast.map((cast_member) =>
      movie.cast.includes(cast_member)
    );
    if ((filter_type = EVERY)) {
      return is_included.every(Boolean);
    } else {
      return is_included.some(Boolean);
    }
  });
};
