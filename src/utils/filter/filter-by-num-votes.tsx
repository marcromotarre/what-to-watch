import Movie from "@/interfaces/Movie";

export const filter_by_num_votes = ({
  movies,
  minimum_num_votes,
  platform,
}: {
  movies: Array<Movie>;
  minimum_num_votes: number;
  platform: string;
}): Array<Movie> => {
  /* eslint-disable */

  return movies.filter((movie: Movie) => {
    return movie["imdb"].num_votes >= minimum_num_votes;
  });
};
