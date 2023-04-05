import { v4 as uuidv4 } from "uuid";

const movie_generator = (num_votes: number) => ({
  id: uuidv4(),
  imdb: {
    num_votes,
  },
});

export default movie_generator;
