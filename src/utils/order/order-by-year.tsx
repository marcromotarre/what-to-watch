import Movie from "@/interfaces/Movie";

export const order_by_year = (movies: Array<Movie>): Array<Movie> => {
  return movies.sort((movie_a: Movie, movie_b: Movie) =>
    movie_a.release_date.year >= movie_b.release_date.year ? 1 : -1
  );
};