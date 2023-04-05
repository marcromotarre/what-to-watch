import { v4 as uuidv4 } from "uuid";

const movie_generator = (popularity: number) => ({
  id: uuidv4(),
  imdb: {
    popularity,
  },
});

export default movie_generator;
