const fs = require("fs");
const puppeteer = require("puppeteer");
const axios = require("axios");

const FILMAFFINITY_IDS_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/filmaffinity/results/filmaffinity-movies.json";
const FILMAFINITY_SCORES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/filmaffinity/results/filmaffinity-scores.json";
const GOOGLE_BASE_URL = "https://www.google.com/";

const GET_GOOGLE_URL = (id, name) =>
  `https://www.google.com/search?q=filmaffinity+film${id}+${name
    .slice(0, -1)
    .replace(/ /g, "+")}`;

const FILMAFFINITY_BASE_URL = "https://www.filmaffinity.com/es/";

const GET_FILMAFFINITY_URL = (id) => `${FILMAFFINITY_BASE_URL}film${id}.html`;

//rating =
//num_votes = document.querySelectorAll("#rso")[0].children[0].children[1].children[0].children[2].children[0].children[2]

(async () => {
  let filmaffinity_scores = await get_filmaffinity_scores();
  const filmaffinity_movies = await get_filmaffinity_movies(
    filmaffinity_scores
  );
  const filmaffinity_movies_keys = Object.keys(filmaffinity_movies);

  // https://scrapingant.com/blog/how-to-use-rotating-proxies-with-puppeteer

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 2000 });
  await page.goto(GOOGLE_BASE_URL);
  await click_on_accept(page);

  for (let i = 0; i < filmaffinity_movies_keys.length; i++) {
    await delay(randomIntFromInterval(1000, 5000));

    const filmaffinity_movie = filmaffinity_movies[filmaffinity_movies_keys[i]];

    await page.goto(
      GET_GOOGLE_URL(
        filmaffinity_movie.filmaffinity_id,
        filmaffinity_movie.filmaffinity_title
      )
    );

    const filmaffinity_score = await get_filmaffinity_score({
      page,
      filmaffinity_movie_id: filmaffinity_movie.filmaffinity_id,
    });
    console.log(
      i,
      " / ",
      filmaffinity_movies_keys.length,
      filmaffinity_movie.filmaffinity_id,
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

    await save_file(filmaffinity_scores);
  }
  await browser.close();
})();

async function get_filmaffinity_scores() {
  return JSON.parse(fs.readFileSync(FILMAFINITY_SCORES_FILE_PATH, "utf8"));
}

function get_filmaffinity_found_scores_ids(filmaffinity_scores) {
  const filmaffinity_scores_ids = Object.keys(filmaffinity_scores);

  return filmaffinity_scores_ids.filter((filmaffinity_score_id) => {
    const filmaffinity_score = filmaffinity_scores[filmaffinity_score_id];
    return (
      filmaffinity_score?.rating !== -1 && filmaffinity_score?.num_votes !== -1
    );
  });
}

async function get_filmaffinity_movies(filmaffinity_scores) {
  const all_filmaffinity_movies = JSON.parse(
    fs.readFileSync(FILMAFFINITY_IDS_FILE_PATH, "utf8")
  );
  const filmaffinity_found_scores_ids =
    get_filmaffinity_found_scores_ids(filmaffinity_scores);
  const all_filmaffinity_movies_keys = Object.keys(all_filmaffinity_movies);
  const found_filmaffinity_keys = all_filmaffinity_movies_keys.filter(
    (all_filmaffinity_movies_key) =>
      all_filmaffinity_movies[all_filmaffinity_movies_key].found /*&&
      !filmaffinity_found_scores_ids.includes(
        all_filmaffinity_movies[all_filmaffinity_movies_key].filmaffinity_id
      )*/
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

function extract_num_votes_from_span(textContent) {
  return parseInt(has_decimals(parseFloat(textContent.replace(" votos", ""))));
}

function get_score_numbers({ movie_rating, movie_num_votes }) {
  if (!movie_rating.includes("Valoración:")) {
    throw "myException";
  }

  if (!movie_num_votes.includes(" votos")) {
    throw "myException";
  }

  return {
    rating: extract_rating_from_span(movie_rating),
    num_votes: extract_num_votes_from_span(movie_num_votes),
  };
}

async function get_filmaffinity_score({ page, filmaffinity_movie_id }) {
  try {
    const movie_rating = await page.evaluate(() => {
      return document.querySelectorAll("div.kvH3mc")[0].children[2].children[0]
        .children[1].textContent;
    });
    const movie_num_votes = await page.evaluate(() => {
      return document.querySelectorAll("div.kvH3mc")[0].children[2].children[0]
        .children[2].textContent;
    });
    return get_score_numbers({ movie_rating, movie_num_votes });
  } catch {
    try {
      const movie_rating = await page.evaluate(() => {
        return document.querySelectorAll("div.kvH3mc")[0].children[3]
          .children[0].children[1].textContent;
      });
      const movie_num_votes = await page.evaluate(() => {
        return document.querySelectorAll("div.kvH3mc")[0].children[3]
          .children[0].children[2].textContent;
      });
      return get_score_numbers({ movie_rating, movie_num_votes });
    } catch {
      try {
        const movie_rating = await page.evaluate(() => {
          return document.querySelectorAll("div.kvH3mc")[1].children[2]
            .children[0].children[1].textContent;
        });
        const movie_num_votes = await page.evaluate(() => {
          return document.querySelectorAll("div.kvH3mc")[1].children[2]
            .children[0].children[2].textContent;
        });
        return get_score_numbers({ movie_rating, movie_num_votes });
      } catch {
        try {
          const movie_rating = await page.evaluate(() => {
            return document.querySelectorAll("div.kvH3mc")[1].children[3]
              .children[0].children[1].textContent;
          });
          const movie_num_votes = await page.evaluate(() => {
            return document.querySelectorAll("div.kvH3mc")[1].children[3]
              .children[0].children[2].textContent;
          });
          return get_score_numbers({ movie_rating, movie_num_votes });
        } catch {
          try {
            const score = await get_score_from_filmaffinity({
              page,
              filmaffinity_movie_id,
            });
            return score;
          } catch {
            return {
              rating: -1,
              num_votes: -1,
            };
          }
        }
      }
    }
  }
}

async function get_score_from_filmaffinity({ page, filmaffinity_movie_id }) {
  await page.goto(GET_FILMAFFINITY_URL(filmaffinity_movie_id));
  await page.screenshot({
    path: "DAAAAAA.jpg",
  });

  const score_from_filmaffinity = {
    rating: await get_filmaffinity_rating(page),
    num_votes: await get_filmaffinity_num_votes(page),
  };
  return score_from_filmaffinity;
}

async function get_filmaffinity_rating(page) {
  try {
    const movie_rating = await page.evaluate(() => {
      return document.querySelector("#movie-rat-avg").getAttribute("content");
    });
    return parseFloat(movie_rating);
  } catch {
    return 0;
  }
}

async function get_filmaffinity_num_votes(page) {
  try {
    const movie_rating = await page.evaluate(() => {
      return document
        .querySelector("#movie-count-rat span")
        .getAttribute("content");
    });
    return parseFloat(movie_rating);
  } catch {
    return 0;
  }
}

async function save_file(filmaffinity_scores) {
  fs.writeFileSync(
    FILMAFINITY_SCORES_FILE_PATH,
    JSON.stringify(filmaffinity_scores)
  );
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function has_decimals(n) {
  let result = n - Math.floor(n) !== 0;
  return result ? n * 1000 : n;
}