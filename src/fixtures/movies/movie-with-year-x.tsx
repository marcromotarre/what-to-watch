import { v4 as uuidv4 } from "uuid";

const movie_generator = (year: number) => ({
  id: uuidv4(),
  release_date: { year },
});

export default movie_generator;
