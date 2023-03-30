const fs = require("fs");
const puppeteer = require("puppeteer");
const axios = require("axios");

const FILMAFFINITY_IDS_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/filmaffinity/results/filmaffinity-movies.json";
const FILMAFINITY_SCORES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/filmaffinity/results/filmaffinity-scores.json";
const GOOGLE_BASE_URL = "https://www.google.com/";

const GET_GOOGLE_URL = (id, name) =>
  `https://www.google.com/search?q=filmaffinity+film${id}+${name.replace(
    " ",
    "+"
  )}`;

//rating =
//num_votes = document.querySelectorAll("#rso")[0].children[0].children[1].children[0].children[2].children[0].children[2]

(async () => {
  let filmaffinity_scores = await get_filmaffinity_scores();
  const filmaffinity_movies = await get_filmaffinity_movies();
  const filmaffinity_movies_keys = Object.keys(filmaffinity_movies);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 2000 });
  await page.goto(GOOGLE_BASE_URL);
  await click_on_accept(page);

  for (let i = 0; i < filmaffinity_movies_keys.length; i++) {
    const filmaffinity_movie = filmaffinity_movies[filmaffinity_movies_keys[i]];

    await page.goto(
      GET_GOOGLE_URL(
        filmaffinity_movie.filmaffinity_id,
        filmaffinity_movie.filmaffinity_title
      )
    );
    await page.screenshot({
      path: "screenshot.jpg",
    });
    const filmaffinity_score = {
      title: filmaffinity_movie.filmaffinity_title,
      rating: await get_filmaffinity_rating(page),
      num_votes: await get_filmaffinity_num_votes(page),
    };
    console.log(
      filmaffinity_score.rating,
      filmaffinity_score.num_votes,
      GET_GOOGLE_URL(
        filmaffinity_movie.filmaffinity_id,
        filmaffinity_movie.filmaffinity_title
      )
    );

    filmaffinity_scores = {
      ...filmaffinity_scores,
      ...{ [filmaffinity_movie.filmaffinity_id]: filmaffinity_score },
    };

    /*console.log(
      i,
      " / ",
      filmaffinity_movies_keys.length,
      GET_GOOGLE_URL(filmaffinity_movie.filmaffinity_id),
      filmaffinity_score.rating,
      filmaffinity_score.num_votes
    );*/

    await save_file(filmaffinity_scores);
  }
  await browser.close();
})();

async function get_filmaffinity_scores() {
  return JSON.parse(fs.readFileSync(FILMAFINITY_SCORES_FILE_PATH, "utf8"));
}

async function get_filmaffinity_movies() {
  const all_filmaffinity_movies = JSON.parse(
    fs.readFileSync(FILMAFFINITY_IDS_FILE_PATH, "utf8")
  );

  const all_filmaffinity_movies_keys = Object.keys(all_filmaffinity_movies);
  const found_filmaffinity_keys = all_filmaffinity_movies_keys.filter(
    (all_filmaffinity_movies_key) =>
      all_filmaffinity_movies[all_filmaffinity_movies_key].found
  );

  return found_filmaffinity_keys.map((found_filmaffinity_key) => ({
    ...all_filmaffinity_movies[found_filmaffinity_key],
  }));
}

async function click_on_accept(page) {
  try {
    await page.evaluate(() => {
      return document
        .querySelectorAll(".qc-cmp2-summary-buttons button")[1]
        .click();
    });
  } catch {}
}

function extract_rating_from_span(textContent) {
  return parseFloat(
    textContent.replace("Valoración: ", "").replace("/10", "").replace(",", ".")
  );
}

async function get_filmaffinity_rating(page, url) {
  try {
    const movie_rating = await page.evaluate(() => {
      return document.querySelectorAll("div.kvH3mc")[0].children[2].children[0]
        .children[1].textContent;
    });
    return extract_rating_from_span(movie_rating);
  } catch {
    try {
      const movie_rating = await page.evaluate(() => {
        return document.querySelectorAll("div.kvH3mc")[0].children[3]
          .children[0].children[1].textContent;
      });
      return extract_rating_from_span(movie_rating);
    } catch {
      return 0;
    }
  }
}

async function get_filmaffinity_num_votes(page, url) {
  try {
    const movie_rating = await page.evaluate(() => {
      return document.querySelectorAll("div.kvH3mc")[0].children[2].children[0]
        .children[2].textContent;
    });
    return extract_rating_from_span(movie_rating);
  } catch {
    try {
      const movie_rating = await page.evaluate(() => {
        return document.querySelectorAll("div.kvH3mc")[0].children[3]
          .children[0].children[2].textContent;
      });
      return extract_rating_from_span(movie_rating);
    } catch {
      return -1;
    }
  }
}

async function save_file(filmaffinity_scores) {
  fs.writeFileSync(
    FILMAFINITY_SCORES_FILE_PATH,
    JSON.stringify(filmaffinity_scores)
  );
}
