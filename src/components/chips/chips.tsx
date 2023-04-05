import { Box } from "@mui/material";
import { relative } from "path";
import FilmaffinityBasicChip from "./filmaffinity-basic-chip";
import FilmaffinitySmallChip from "./filmaffinity-small-chip";
import ImdbBasicChip from "./imdb-basic-chip";
import BorderPoster from "../posters/border-poster";
import RoundedPoster from "../posters/rounded-poster";

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
    tags: ["FILMAFFINITY", "IMDB", "ROTTEN_TOMATOES"],
  },
  {
    name: "BASIC_CHIP_FILMAFFINITY",
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
    tags: ["FILMAFFINITY"],
  },
  {
    name: "SMALL_CHIP_FILMAFFINITY",
    component: ({ poster, styles, name, image, rating }) => {
      return (
        <Box sx={{ ...styles, position: "relative" }}>
          {poster.component({ styles: styles?.posterStyle, name, image })}
          <FilmaffinitySmallChip
            rating={rating % 1 != 0 ? rating : `${rating}.0`}
          />
        </Box>
      );
    },
    tags: ["FILMAFFINITY"],
  },
  {
    name: "BASIC_CHIP_IMDB",
    component: ({ poster, styles, name, image, rating }) => {
      return (
        <Box sx={{ ...styles, position: "relative" }}>
          {poster.component({ styles: styles?.posterStyle, name, image })}
          <ImdbBasicChip
            rating={rating % 1 != 0 ? rating : `${rating}.0`}
          />
        </Box>
      );
    },
    tags: ["IMDB"],
  },
];

export default CHIPS;
