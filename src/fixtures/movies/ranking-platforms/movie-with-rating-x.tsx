import { v4 as uuidv4 } from "uuid";

const movie_generator = ({ rating_filmaffinity, rating_imdb }: Ratings) => ({
  id: uuidv4(),
  filmaffinity: {
    rating: rating_filmaffinity,
  },
  imdb: {
    rating: rating_imdb,
  },
});

type Ratings = {
  rating_filmaffinity: number;
  rating_imdb: number;
};

export default movie_generator;
