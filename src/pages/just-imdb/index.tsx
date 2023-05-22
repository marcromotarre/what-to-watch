import just_watch_movies from "../../scrap/just-watch/results/old/just-watch-movies.json";
import { Box, Button } from "@mui/material";

export default function Home() {
  const just_watch_movies_ids = Object.keys(just_watch_movies).filter(
    (_, index) => index < 1
  );

  const open_just_watch = (just_watch_id: any) => {
    window.open(
      `https://www.justwatch.com${just_watch_id}`,
      "_blank",
      "noreferrer"
    );
  };

  const open_google_imdb = (just_watch_id: any) => {
    const just_watch_movie_title = just_watch_id.replace("/es/pelicula/", "");
    window.open(
      `https://www.google.com/search?q=${just_watch_movie_title}+imdb`,
      "_blank",
      "noreferrer"
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        display: "grid",
        gridTemplateColumns: "100%",
        rowGap: "1px",
        marginLeft: 3,
      }}
    >
      {just_watch_movies_ids.map((just_watch_movies_id) => (
        <Box key={just_watch_movies_id} sx={{display: "grid", gridTemplateColumns: "600px 200px 100px"}}>
          <Button sx={{height: "100px", backgroundColor: "#999"}} onClick={() => open_just_watch(just_watch_movies_id)}>
            {`${just_watch_movies_id.replace("/es/pelicula/", "")}`}
          </Button>
          <Button sx={{height: "100px", backgroundColor: "#AAAAAA"}} onClick={() => open_google_imdb(just_watch_movies_id)}>IMDB</Button>
          <Button onClick={() => {}}>Update</Button>
        </Box>
      ))}
    </Box>
  );
}
