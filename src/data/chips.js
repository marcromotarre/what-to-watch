import { Box } from "@mui/material";
import { relative } from "path";
import FilmaffinityBasicChip from "../components/chips/filmaffinity-basic-chip";
import BorderPoster from "../components/posters/border-poster";
import RoundedPoster from "../components/posters/rounded-poster";

export const getChipsByTag = (tag) => {
  return CHIPS.filter((chip) => chip.tags.includes(tag));
};
const CHIPS = [
  {
    name: "NO_CHIP",
    component: ({ poster, styles, name, image }) => {
      return (
        <Box sx={{ ...styles, position: "relative" }}>
          {poster.component({ styles: styles?.posterStyle, name, image })}
        </Box>
      );
    },
    selected: false,
    tags: ["FILMAFFINITY", "IMDB", "ROTTEN_TOMATOES"],
  },

  {
    name: "BASIC_CHIP",
    component: ({ poster, styles, name, image, rating }) => {
      return (
        <Box sx={{ ...styles, position: "relative" }}>
          {poster.component({ styles: styles?.posterStyle, name, image })}
          <FilmaffinityBasicChip
            rating={rating % 1 != 0 ? rating : `${rating}.0`}
          />
        </Box>
      );
    },
    selected: false,
    tags: ["FILMAFFINITY"],
  },
];

export default CHIPS;
