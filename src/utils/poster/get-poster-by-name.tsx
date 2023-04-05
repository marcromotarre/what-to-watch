import CHIPS from "@/components/chips/chips";
import POSTERS from "@/data/posters";
import Chip from "@/interfaces/Chip";
import Poster from "@/interfaces/Poster";

const get_poster_by_name = (name: string): Poster | undefined => {
  return POSTERS.find((poster) => poster.name === name);
};

export default get_poster_by_name;
