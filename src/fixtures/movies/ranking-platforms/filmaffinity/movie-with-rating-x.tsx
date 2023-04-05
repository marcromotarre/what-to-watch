import { v4 as uuidv4 } from "uuid";

const movie_generator = (rating: number) => ({
  id: uuidv4(),
  filmaffinity: {
    rating,
  },
});

export default movie_generator;
