import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Box, Stack, Typography } from "@mui/material";
import { useIsVisible } from "../../hooks/useIsVisible";
import BorderPoster from "../../components/posters/border-poster";
import { getChipsByTag } from "../../data/chips";
import POSTERS from "../../data/posters";

export default function WidgetCarousel({
  name = "Widget Name",
  filters = [],
  order,
}) {
  // build query

  const PAGE_SIZE = 10;

  const [movies, setMovies] = useState([]);
  const [next, setNext] = useState(null);
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (isVisible && next) {
      get_movies(next);
    }
  }, [isVisible]);

  useEffect(() => {
    get_movies({ filters });
  }, []);

  const get_movies = async ({
    page = 0,
    limit = PAGE_SIZE,
    filters = [],
    order = ["popularity", "num_votes", "rating", "year"],
  }) => {
    const url = `http://localhost:3000/api/movies`;
    const { data } = await axios.post(url, { page, limit, filters, order });
    console.log(data);
    setMovies([...movies, ...data.results]);
    setNext(data.next);
  };

  const POSTER_WIDTH = 150;
  return (
    <Box sx={{ backgroundColor: "black" }}>
      <Box>
        <Typography sx={{color: "white"}}>{name}</Typography>
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
        {movies.map(({ id, poster_path, title, filmaffinity }) => (
          <Box key={id}>
            {getChipsByTag("FILMAFFINITY")[1].component({
              styles: { width: "auto", height: "auto" },
              poster: POSTERS[0],
              image: poster_path,
              name: title,
              rating: filmaffinity.rating,
              votes: filmaffinity.num_votes,
            })}
          </Box>
        ))}
        <Box ref={ref}>
          <p>{isVisible ? "Visible" : "Not visible"}</p>
        </Box>
      </Box>
    </Box>
  );
}
