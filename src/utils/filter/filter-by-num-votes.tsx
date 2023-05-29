import Movie from "@/interfaces/Movie";

export const filter_by_num_votes = ({
  movies,
  filmaffinity_minimum_num_votes = 0,
  imdb_minimum_num_votes = 0,
  platform,
}: {
  movies: Array<Movie>;
  filmaffinity_minimum_num_votes?: number;
  imdb_minimum_num_votes?: number;
  platform: keyof Movie;
}): Array<Movie> => {
  const num_votes: any = {
    FILMAFFINITY: filmaffinity_minimum_num_votes,
    IMDB: imdb_minimum_num_votes
  }

  return movies.filter((movie: Movie) => {
    const movie_platform: any = movie[platform];
    return movie_platform.num_votes >= num_votes[platform];
  });
};
