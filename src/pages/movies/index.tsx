import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Box, Stack } from "@mui/material";
import { useIsVisible } from "../../hooks/useIsVisible";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [next, setNext] = useState(null);
  const [page, setPage] = useState(0);
  const page_size = 5;
  const GENRES = [18]

  const ref = useRef();
  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (isVisible && next) {
      get_movies(next);
    }
  }, [isVisible]);

  useEffect(() => {
    console.log("BOOM");
    get_movies(
      `http://localhost:3000/api/movies?page=${page}&limit=${page_size}&genres=${GENRES}`
    );
  }, []);

  const get_movies = async (url) => {
    const { data } = await axios({
      method: "get",
      url,
    });
    console.log(data);

    setMovies([...movies, ...data.results]);
    setNext(data.next);
  };

  const POSTER_WIDTH = 150;
  return (
    <Box sx={{ backgroundColor: "white", height: "100vh" }}>
      {/*<Box
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
        {movies.map(({ id, poster_path, title }) => (
          <Box key={id} sx={{ width: "100%" }}>
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={title}
              sx={{ width: `${POSTER_WIDTH}px` }}
            ></Box>
          </Box>
        ))}
        </Box>*/}
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
        {movies.map(({ id, poster_path, title }) => (
          <Box key={id} sx={{ width: "100%" }}>
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
              alt={title}
              sx={{ width: `${POSTER_WIDTH}px` }}
            ></Box>
          </Box>
        ))}
          <Box ref={ref}>
            <p>{isVisible ? "Visible" : "Not visible"}</p>
          </Box>
      </Box>
    </Box>
  );
}
