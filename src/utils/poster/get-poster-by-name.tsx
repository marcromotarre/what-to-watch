import POSTERS from "@/data/posters";

const get_poster_by_name = (name: string): any => {
  return POSTERS.find((poster) => poster.name === name);
};

export default get_poster_by_name;
