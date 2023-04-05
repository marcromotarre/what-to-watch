import { getChipsByTag } from "@/components/chips/chips";
import POSTERS from "@/data/posters";
import Movie from "@/interfaces/Movie";
import get_chip_by_name from "@/utils/chip/get-chip-by-name";
import get_poster_by_name from "@/utils/poster/get-poster-by-name";
import { Box } from "@mui/material";

export default function MoviePoster({
  movie,
  chip,
  poster,
  rating_platform,
}: MoviePosterProps) {
  const chip_data = get_chip_by_name(chip);
  return (
    <Box>
      {chip_data &&
        chip_data.component({
          styles: { width: "auto", height: "auto" },
          poster: get_poster_by_name(poster),
          image: movie.poster_path,
          name: movie.title,
          rating: movie[rating_platform].rating,
          votes: movie[rating_platform].num_votes,
        })}
    </Box>
  );
}

type MoviePosterProps = {
  movie: Movie;
  chip: string;
  poster: string;
  rating_platform: string;
};
