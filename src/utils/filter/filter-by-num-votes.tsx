
import Movie from "@/interfaces/Movie";

export const filter_by_num_votes = ({
  movies,
  minimum_num_votes,
  platform
}: {
  movies: Array<Movie>;
  minimum_num_votes: number;
  platform: string;
}): Array<Movie> => {
 

  return movies.filter((movie: Movie) => {
    return (
        movie[platform].num_votes >= minimum_num_votes,
    );
  });
};

