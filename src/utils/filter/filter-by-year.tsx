import Movie from "@/interfaces/Movie";

export const filter_by_year = ({
  movies,
  year_init,
  year_end,
}: {
  movies: Array<Movie>;
  year_init: number;
  year_end: number;
}): Array<Movie> => {
  if (year_init === RESERVED_YEARS.ACTUAL) {
    year_init = new Date().getUTCFullYear();
  }
  if (year_end === RESERVED_YEARS.ACTUAL) {
    year_end = new Date().getUTCFullYear();
  }

  if (year_init === RESERVED_YEARS.LAST_YEAR) {
    year_init = new Date().getUTCFullYear() - 1;
  }
  if (year_end === RESERVED_YEARS.LAST_YEAR) {
    year_end = new Date().getUTCFullYear() - 1;
  }

  return movies.filter((movie: Movie) => {
    return (
      year_init <= movie.release_date.year &&
      movie.release_date.year <= year_end
    );
  });
};

export const RESERVED_YEARS = {
  ACTUAL: 0,
  LAST_YEAR: 1,
  THIS_DECADE: 2
};