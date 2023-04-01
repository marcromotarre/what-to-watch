const fs = require("fs");
const axios = require("axios");

const TMDB_API_KEY = "480ff227df49aaa3c76ea70d0462d207";
const JUST_WATCH_MOVIES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/just_watch/results/just-watch-movies.json";
const OWN_MOVIES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/own/results/own-movies.json";
const OWN_PEOPLE_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/own/results/own-people.json";
const OWN_GENRES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/own/results/own-genres.json";

const TMDB_MOVIES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/tmdb/results/tmdb-movies.json";
const IMDB_MOVIES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/imdb/results/imdb-movies.json";
const FILMAFFINITY_SCORES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/filmaffinity/results/filmaffinity-scores.json";

const FILMAFFINITY_MOVIES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/filmaffinity/results/filmaffinity-movies.json";

const GET_QUERY_MOVIE_INFO_FROM_TMDB = (tmdb_id) =>
  `https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${TMDB_API_KEY}&language=es-ES`;
const GET_QUERY_MOVIE_CREDITS_FROM_TMDB = (tmdb_id) =>
  `https://api.themoviedb.org/3/movie/${tmdb_id}/credits?api_key=${TMDB_API_KEY}&language=es-ES`;
(async () => {
  const just_watch_movies = await get_just_watch_movies();
  const imdb_movies = await get_imdb_movies();
  const tmdb_movies = await get_tmdb_movies();
  const filmaffinity_scores = await get_filmaffintiy_scores();
  const filmaffinity_movies = await get_filmaffinity_movies();
  const own_movies = await get_own_movies();
  const own_people = await get_own_people();
  const own_genres = await get_own_genres();

  const tmdb_movies_ids = await get_tmdb_movies_ids();
  for (const [index, tmdb_movie_id] of tmdb_movies_ids.entries()) {
    if (index < 8100) continue;
    const { data: movie_data } = await axios.get(
      GET_QUERY_MOVIE_INFO_FROM_TMDB(tmdb_movie_id)
    );

    const { data: movie_credits_data } = await axios.get(
      GET_QUERY_MOVIE_CREDITS_FROM_TMDB(tmdb_movie_id)
    );

    movie_data.genres.forEach(({ id, name }) => (own_genres[id] = name));
    movie_credits_data.cast.forEach(
      ({ id, original_name }) => (own_people[id] = original_name)
    );
    movie_credits_data.crew
      .filter(({ job }) => job === "Director")
      .map(({ id, original_name }) => ({ id, original_name }))
      .forEach(({ id, original_name }) => (own_people[id] = original_name));

    own_movies[movie_data.id] = {
      id: movie_data.id,
      title: movie_data.title,
      original_title: movie_data.original_title,
      runtime: movie_data.runtime,
      poster_path: movie_data.poster_path,
      genres: movie_data.genres.map(({ id }) => id),
      cast: movie_credits_data.cast.map(({ id }) => id),
      directors: movie_credits_data.crew
        .filter(({ job }) => job === "Director")
        .map(({ id }) => id),
      imdb: {
        score: 0,
        votes: 0,
      },
      filmaffinity: get_filmaffinity_movie_score({
        tmdb_movie_id,
        filmaffinity_movies,
        filmaffinity_scores,
      }),
      platforms: get_just_watch_platforms({
        tmdb_movie_id,
        just_watch_movies,
        imdb_movies,
        tmdb_movies,
      }),
    };
    console.log(index, " / ", tmdb_movies_ids.length, movie_data.title);
    await save_files({ own_movies, own_people, own_genres });
  }
  await save_files({ own_movies, own_people, own_genres });
})();

function get_just_watch_platforms({
  tmdb_movie_id,
  tmdb_movies,
  imdb_movies,
  just_watch_movies,
}) {
  const imdb_movie_id = tmdb_movies[tmdb_movie_id];
  const just_watch_movie_id = imdb_movies[imdb_movie_id];
  return just_watch_movies[just_watch_movie_id];
}

function get_filmaffinity_movie_score({
  tmdb_movie_id,
  filmaffinity_movies,
  filmaffinity_scores,
}) {
  const filmaffinity_movie = filmaffinity_movies[tmdb_movie_id];
  if (filmaffinity_movie) {
    const filmaffinity_id = filmaffinity_movies[tmdb_movie_id].filmaffinity_id;
    if (filmaffinity_id && filmaffinity_scores[filmaffinity_id]) {
      return {
        rating: filmaffinity_scores[filmaffinity_id].rating,
        num_votes: filmaffinity_scores[filmaffinity_id].num_votes,
      };
    }
  }

  return {
    rating: 0,
    num_votes: 0,
  };
}

async function save_files({ own_genres, own_movies, own_people }) {
  await fs.writeFileSync(OWN_MOVIES_FILE_PATH, JSON.stringify(own_movies));
  await fs.writeFileSync(OWN_PEOPLE_FILE_PATH, JSON.stringify(own_people));
  await fs.writeFileSync(OWN_GENRES_FILE_PATH, JSON.stringify(own_genres));
}

async function get_just_watch_movies() {
  return JSON.parse(fs.readFileSync(JUST_WATCH_MOVIES_FILE_PATH, "utf8"));
}

async function get_own_movies() {
  return JSON.parse(fs.readFileSync(OWN_MOVIES_FILE_PATH, "utf8"));
}

async function get_own_people() {
  return JSON.parse(fs.readFileSync(OWN_PEOPLE_FILE_PATH, "utf8"));
}

async function get_own_genres() {
  return JSON.parse(fs.readFileSync(OWN_GENRES_FILE_PATH, "utf8"));
}

async function get_imdb_movies() {
  return JSON.parse(fs.readFileSync(IMDB_MOVIES_FILE_PATH, "utf8"));
}

async function get_tmdb_movies() {
  return JSON.parse(fs.readFileSync(TMDB_MOVIES_FILE_PATH, "utf8"));
}

async function get_filmaffinity_movies() {
  return JSON.parse(fs.readFileSync(FILMAFFINITY_MOVIES_FILE_PATH, "utf8"));
}

async function get_filmaffintiy_scores() {
  return JSON.parse(fs.readFileSync(FILMAFFINITY_SCORES_FILE_PATH, "utf8"));
}

async function get_tmdb_movies_ids() {
  return Object.keys(
    JSON.parse(fs.readFileSync(TMDB_MOVIES_FILE_PATH, "utf8"))
  );
}

function clean_platforms() {}
