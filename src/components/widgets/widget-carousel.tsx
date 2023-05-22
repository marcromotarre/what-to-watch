import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useIsVisible } from "../../hooks/useIsVisible";
import MoviePoster from "../movies/movie-poster";
import Movie from "@/interfaces/Movie";
import { inter_regular } from "@/fonts/inter";


export default function WidgetCarousel({
  name = "Widget Name",
  filters = [],
  order,
  movie_poster,
  rating_platform,
}: any) {
  // build query

  const PAGE_SIZE = 10;

  const [movies, setMovies] = useState<any>([]);
  const [next, setNext] = useState(null);
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (isVisible && next) {
      get_movies(next);
    }
    // eslint-disable-next-line
  }, [isVisible]);

  useEffect(() => {
    get_movies({ filters });
    // eslint-disable-next-line
  }, []);

  const get_movies = async ({
    page = 0,
    limit = PAGE_SIZE,
    filters = [],
    order = ["popularity", "num_votes", "rating", "year"],
  }) => {
    const url = `http://localhost:3000/api/movies`;
    const { data } = await axios.post(url, { page, limit, filters, order });
    setMovies([...movies, ...data.results]);
    setNext(data.next);
  };

  const POSTER_WIDTH = 150;
  return (
    <Box sx={{ backgroundColor: "#3D3D3D" }}>
      <Box>
        <Typography
          className={inter_regular.className}
          sx={{ color: "white", paddingLeft: 2 }}
        >
          {name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridGap: "16px",
          padding: "16px",
          gridTemplateColumns: `repeat(auto-fill,minmax(${POSTER_WIDTH}px,1fr))`,
          gridAutoFlow: "column",
          gridAutoColumns: ` minmax(${POSTER_WIDTH}px,1fr)`,
          overflowX: "auto",
        }}
      >
        {movies.map((movie: Movie) => (
          <MoviePoster
            key={movie.id}
            movie={movie}
            chip={movie_poster.chip_name}
            poster={movie_poster.poster_type}
            rating_platform={rating_platform}
          />
        ))}
        <Box ref={ref}></Box>
      </Box>
    </Box>
  );
}
