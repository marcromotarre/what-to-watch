import Movie from "@/interfaces/Movie";
import { RatingPlatforms } from "@/interfaces/RatingPlatform";

export const filter_by_rating = ({
  movies,
  filmaffinity_minimum_rating = 0,
  imdb_minimum_rating = 0,
  platform,
}: {
  movies: Array<Movie>;
  filmaffinity_minimum_rating?: number;
  imdb_minimum_rating?: number;
  platform: keyof Movie;
}): Array<Movie> => {
  const rating: any = {
    FILMAFFINITY: filmaffinity_minimum_rating,
    IMDB: imdb_minimum_rating
  }

  const minimum_rating: any = rating[platform]
  console.log(platform)
  return movies.filter((movie: Movie) => {
    const movie_platform: any = movie[platform];
    return movie_platform.rating >= minimum_rating;
  });
};
