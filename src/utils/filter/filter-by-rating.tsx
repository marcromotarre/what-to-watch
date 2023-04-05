
import Movie from "@/interfaces/Movie";

export const filter_by_rating = ({
  movies,
  minimum_rating,
  platform
}: {
  movies: Array<Movie>;
  minimum_rating: number;
  platform: string;
}): Array<Movie> => {
 

  return movies.filter((movie: Movie) => {
    return (
        movie[platform].rating >= minimum_rating,
    );
  });
};
