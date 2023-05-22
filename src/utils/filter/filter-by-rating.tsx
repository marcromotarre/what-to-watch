import IMDB from "@/interfaces/IMDB";
import Movie from "@/interfaces/Movie";
import Score from "@/interfaces/Score";

export const filter_by_rating = ({
  movies,
  minimum_rating,
  platform,
}: {
  movies: Array<Movie>;
  minimum_rating: number;
  platform: keyof Movie;
}): Array<Movie> => {
  return movies.filter((movie: Movie) => {
    const movie_platform: any = movie[platform];
    return movie_platform.rating >= minimum_rating;
  });
};
