const fs = require("fs");
const puppeteer = require("puppeteer");
const axios = require("axios");

const IMDB_MOVIES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/imdb/results/imdb-movies.json";

const IMDB_MOVIES_NEW_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/imdb/results/new-imdb-movies.json";

const IMDB_MOVIES_OLD_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/imdb/results/old/imdb-movies.json";

(async () => {
  const imdb_movies = get_imdb_movies();
  const imdb_movies_ids = Object.keys(imdb_movies);

  const just_watch = {};
  let number = 0;
  imdb_movies_ids.forEach((imdb_movie_id) => {
    const just_watch_id = imdb_movies[imdb_movie_id].just_watch_id;
    if (!just_watch[just_watch_id]) just_watch[just_watch_id] = [];
    just_watch[just_watch_id].push(imdb_movie_id);
  });
  console.log(just_watch);
  const just_watch_ids = Object.keys(just_watch);
  just_watch_ids.forEach((just_watch_id) => {
      
  });

  //save_file(new_format);
})();

function save_file(new_format) {
  //fs.writeFileSync(IMDB_MOVIES_NEW_FILE_PATH, JSON.stringify(new_format));
}

function get_imdb_movies() {
  return JSON.parse(fs.readFileSync(IMDB_MOVIES_FILE_PATH, "utf8"));
}

function get_imdb_old_movies() {
  return JSON.parse(fs.readFileSync(IMDB_MOVIES_OLD_FILE_PATH, "utf8"));
}
