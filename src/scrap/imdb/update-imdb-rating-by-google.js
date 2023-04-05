const fs = require("fs");
const puppeteer = require("puppeteer");
const axios = require("axios");

const IMDB_IDS_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/imdb/results/imdb-movies.json";
const IMDB_SCORES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/imdb/results/imdb-scores.json";
const GOOGLE_BASE_URL = "https://www.google.com/";

const GET_GOOGLE_URL = (id) => `https://www.google.com/search?q=imdb+${id}`;

//rating =
//num_votes = document.querySelectorAll("#rso")[0].children[0].children[1].children[0].children[2].children[0].children[2]

(async () => {
  let imdb_scores = await get_imdb_scores();
  const imdb_movies = await get_imdb_movies_ids(imdb_scores);

  // https://scrapingant.com/blog/how-to-use-rotating-proxies-with-puppeteer

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 2000 });
  await page.goto(GOOGLE_BASE_URL);
  await click_on_accept(page);

  for (let i = 0; i < imdb_movies.length; i++) {
    await delay(randomIntFromInterval(1000, 5000));

    const imdb_movie_id = imdb_movies[i];

    await page.goto(GET_GOOGLE_URL(imdb_movie_id));
    await page.screenshot({
      path: "screenshot.jpg",
    });
    const today = new Date();

    const imdb_score = {
      rating: await get_imdb_rating(page),
      num_votes: await get_imdb_num_votes(page),
      updated:
        today.getFullYear() +
        "-" +
        (today.getMonth()) +
        "-" +
        today.getDate(),
    };
    console.log(
      i,
      " / ",
      imdb_movies.length,
      imdb_movie_id,
      imdb_score.rating,
      imdb_score.num_votes
    );

    imdb_scores = {
      ...imdb_scores,
      ...{ [imdb_movie_id]: imdb_score },
    };

    await save_file(imdb_scores);
  }
  await browser.close();
})();

async function get_imdb_scores() {
  return JSON.parse(fs.readFileSync(IMDB_SCORES_FILE_PATH, "utf8"));
}

function get_imdb_found_scores_ids(imdb_scores) {
  const imdb_scores_ids = Object.keys(imdb_scores);

  return imdb_scores_ids.filter((imdb_score_id) => {
    const imdb_score = imdb_scores[imdb_score_id];
    return imdb_score.rating !== -1 && imdb_score.num_votes !== -1;
  });
}

async function get_imdb_movies_ids(imdb_scores) {
  const all_imdb_movies = JSON.parse(
    fs.readFileSync(IMDB_IDS_FILE_PATH, "utf8")
  );
  const imdb_found_scores_ids = get_imdb_found_scores_ids(imdb_scores);
  const all_imdb_movies_keys = Object.keys(all_imdb_movies);

  const found_imdb_keys = all_imdb_movies_keys.filter((_, index) => {
    return !imdb_found_scores_ids.includes(all_imdb_movies_keys[index]);
  });

  return found_imdb_keys;
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
  return parseInt(
    textContent.replace(" votos", "").replace(".", '')
  );
}

async function get_imdb_rating(page, url) {
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
      try {
        const movie_rating = await page.evaluate(() => {
          return document.querySelectorAll("div.kvH3mc")[1].children[2]
            .children[0].children[1].textContent;
        });
        return extract_rating_from_span(movie_rating);
      } catch {
        try {
          const movie_rating = await page.evaluate(() => {
            return document.querySelectorAll("div.kvH3mc")[1].children[3]
              .children[0].children[1].textContent;
          });
          return extract_rating_from_span(movie_rating);
        } catch {
          return -1;
        }
      }
    }
  }
}

async function get_imdb_num_votes(page, url) {
  try {
    const movie_num_votes = await page.evaluate(() => {
      return document.querySelectorAll("div.kvH3mc")[0].children[2].children[0]
        .children[2].textContent;
    });
    return extract_num_votes_from_span(movie_num_votes);
  } catch {
    try {
      const movie_num_votes = await page.evaluate(() => {
        return document.querySelectorAll("div.kvH3mc")[0].children[3]
          .children[0].children[2].textContent;
      });
      return extract_num_votes_from_span(movie_num_votes);
    } catch {
      try {
        const movie_num_votes = await page.evaluate(() => {
          return document.querySelectorAll("div.kvH3mc")[1].children[2]
            .children[0].children[2].textContent;
        });
        return extract_num_votes_from_span(movie_num_votes);
      } catch {
        try {
          const movie_num_votes = await page.evaluate(() => {
            return document.querySelectorAll("div.kvH3mc")[1].children[3]
              .children[0].children[2].textContent;
          });
          return extract_num_votes_from_span(movie_num_votes);
        } catch {
          return -1;
        }
      }
    }
  }
}

async function save_file(imdb_scores) {
  fs.writeFileSync(IMDB_SCORES_FILE_PATH, JSON.stringify(imdb_scores));
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