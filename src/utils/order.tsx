import Movie from "@/interfaces/Movie";

export const order_by_year = (movies: Array<Movie>): Array<Movie> => {
  return movies.sort((movie_a: Movie, movie_b: Movie) =>
    movie_a.release_date.year >= movie_b.release_date.year ? 1 : -1
  );
};

export const order_by_popularity = (movies: Array<Movie>): Array<Movie> => {
  return movies.sort((movie_a, movie_b) =>
    movie_a.tmdb.popularity >= movie_b.tmdb.popularity
      ? -1
      : 1
  );
};

function has_decimals(n: number): number {
  let result = n - Math.floor(n) !== 0;
  return result ? n * 1000 : n;
}
