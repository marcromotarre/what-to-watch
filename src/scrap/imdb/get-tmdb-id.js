const fs = require("fs");
const axios = require("axios");

const TMDB_API_KEY = "480ff227df49aaa3c76ea70d0462d207";
const TMDB_FILE_PATH = "../tmdb/results/movies.json";
const IMDB_FILE_PATH = "./results/movies.json";
const IMDB_NOT_FOUND_FILE_PATH = "./results/movies-not-found.json";

(async () => {
  let tmdb_movies = await get_tmdb_movies();
  let imdb_not_found = await get_imdb_not_found_movies();
  const imdb_movies_ids = await get_imdb_movies_ids({
    imdb_not_found,
    tmdb_movies,
  });

  for (const [index, imdb_movie_id] of imdb_movies_ids.entries()) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/find/${imdb_movie_id}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
    );
    if (data.movie_results.length === 1) {
      const tmdb_id = data.movie_results[0].id;
      tmdb_movies[tmdb_id] = imdb_movie_id;
      console.log(index, " / ", imdb_movies_ids.length, " - ", imdb_movie_id, tmdb_id);
    } else {
      imdb_not_found.push(imdb_movie_id);
      console.log(index, " / ", imdb_movies_ids.length, " - ", imdb_movie_id, "NOT_FOUND");
    }
    save_files({ tmdb_movies, imdb_not_found });
  }
})();

async function save_files({ tmdb_movies, imdb_not_found }) {
  await fs.writeFileSync(TMDB_FILE_PATH, JSON.stringify(tmdb_movies));
  await fs.writeFileSync(
    IMDB_NOT_FOUND_FILE_PATH,
    JSON.stringify(imdb_not_found)
  );
}

async function get_tmdb_movies() {
  return JSON.parse(fs.readFileSync(TMDB_FILE_PATH, "utf8"));
}

async function get_imdb_not_found_movies() {
  return JSON.parse(fs.readFileSync(IMDB_NOT_FOUND_FILE_PATH, "utf8"));
}

async function get_imdb_movies_ids({ tmdb_movies, imdb_not_found }) {
  const found_imdb_movies = Object.keys(tmdb_movies).map(
    (tmdb_movie_id) => tmdb_movies[tmdb_movie_id]
  );

  const imdb_movies = JSON.parse(fs.readFileSync(IMDB_FILE_PATH, "utf8"));
  return Object.keys(imdb_movies).filter(
    (imdb_movie_id) =>
      !imdb_not_found.includes(imdb_movie_id) &&
      !found_imdb_movies.includes(imdb_movie_id)
  );
  return;
}
