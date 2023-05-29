import Movie from "@/interfaces/Movie";

export const order_by_popularity = (movies: Array<Movie>): Array<Movie> => {
    return movies.sort((movie_a, movie_b) =>
      movie_a.IMDB.popularity > movie_b.IMDB.popularity
        ? 1
        : -1
    );
  };