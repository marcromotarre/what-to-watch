const fs = require("fs");
const puppeteer = require("puppeteer");
const axios = require("axios");

const FILMAFFINITY_IDS_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/filmaffinity/results/filmaffinity-movies.json";
const FILMAFINITY_SCORES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/filmaffinity/results/filmaffinity-scores.json";
const GOOGLE_BASE_URL = "https://www.google.com/";

const GET_GOOGLE_URL = (id) =>
  `https://www.google.com/search?q=filmaffinity+film${id}`;

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

    await page.goto(GET_GOOGLE_URL(filmaffinity_movie.filmaffinity_id));
    await page.screenshot({
      path: "screenshot.jpg",
    });
    const filmaffinity_score = {
      title: filmaffinity_movie.filmaffinity_title,
      rating: await get_filmaffinity_rating(page),
      num_votes: await get_filmaffinity_num_votes(page),
    };

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
    console.log(await get_filmaffinity_rating(page));

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

async function get_filmaffinity_rating(page) {
  //try {
 
  let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  console.log(bodyHTML);
  const movie_rating = await page.evaluate(() => {
    // const a = parseFloat(
    return document.querySelector(
      "[href='https://www.filmaffinity.com/es/film576352.html']"
    ); /*.parentElement.parentElement.parentElement.children[2].children[0].children[1].textContent.replace(
            "Valoración: ",
            ""
          )
          .replace("/10", "")
          .replace(",", ".")*/
    // );
    return 0;
  });
  console.log(movie_rating);
  return movie_rating;
  //} catch {
  //  return 150;
  // }
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
