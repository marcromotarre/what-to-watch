const fs = require("fs");
const puppeteer = require("puppeteer");
const axios = require("axios");

const FILMAFFINITY_MOVIES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/filmaffinity/results/filmaffinity-movies.json";
const FILMAFFINITY_BASE_URL = "https://www.filmaffinity.com/es/";
const TMDB_MOVIES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/tmdb/results/tmdb-movies.json";

const IMDB_MOVIES_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/imdb/results/imdb-movies.json";

(async () => {
  let filmaffinity_movies = await get_filmaffinity_movies();
  let tmdb_movies_ids = await get_tmdb_movies_ids({ filmaffinity_movies });
  let tmdb_movies = await get_tmdb_movies();
  let imdb_movies = await get_imdb_movies();
  console.log(
    Object.keys(filmaffinity_movies).length,
    " / ",
    tmdb_movies_ids.length
  );

  for (tmdb_movies_id of tmdb_movies_ids) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 2000 });

      const { data: credits } = await axios.get(
        `https://api.themoviedb.org/3/movie/${tmdb_movies_id}/credits?api_key=480ff227df49aaa3c76ea70d0462d207&external_source=imdb_id`
      );

      const { data: details } = await axios.get(
        `https://api.themoviedb.org/3/movie/${tmdb_movies_id}?api_key=480ff227df49aaa3c76ea70d0462d207&external_source=imdb_id`
      );

      // get movie details
      const title = get_just_watch_url_movie_title({
        tmdb_id: tmdb_movies_id,
        imdb_movies,
        tmdb_movies,
      });
      //movies_db[tmdb_movies_id].justWatchUrl.split("/es/pelicula/")[1];
      const cast = credits.cast.map(({ name }) => name);
      const directors = credits.crew
        .filter(({ job }) => job === "Director")
        .map(({ name }) => name);

      year = details.release_date.split("-")[0];

      await page.goto(`https://www.filmaffinity.com/es/advsearch.php`);
      await page.screenshot({
        path: "screenshot.jpg",
      });
      await page.evaluate(() => {
        return document
          .querySelectorAll(".qc-cmp2-summary-buttons button")[1]
          .click();
      });

      const values = {
        page,
        directors,
        cast,
        year,
        title,
      };

      const functions_to_check = [
        () => director_and_cast_and_year({ ...values }),
        () =>
          director_and_cast_and_year({
            ...values,
            directors_number: 1,
            cast_number: 1,
          }),
        () =>
          director_and_cast_and_year({
            ...values,
            directors_number: 1,
            cast_number: 1,
            year_enabled: false,
          }),
        () =>
          director_and_cast_and_year({
            ...values,
            directors_number: 1,
            year_enabled: false,
          }),
      ];
      let found = false;
      let filmaffinity_id = "";
      let filmaffinity_title = "";

      for (
        let iFunc = 0;
        iFunc < functions_to_check.length && !found;
        iFunc++
      ) {
        await functions_to_check[iFunc]();
        const results = await get_number_of_results(page);
        if (results === "1") {
          filmaffinity_id = await page.evaluate(() => {
            return document
              .querySelector(".mc-title a")
              .getAttribute("href")
              .replace("https://www.filmaffinity.com/es/film", "")
              .replace(".html", "");
          });
          filmaffinity_title = await page.evaluate(() => {
            return document.querySelector(".mc-title a").getAttribute("title");
          });
          found = true;
        }
      }
      filmaffinity_movies = {
        ...filmaffinity_movies,
        ...{
          [tmdb_movies_id]: {
            filmaffinity_id,
            filmaffinity_title,
            title,
            found,
          },
        },
      };

      console.log(
        tmdb_movies_id,
        title,
        found,
        filmaffinity_id,
        filmaffinity_title
      );
      fs.writeFileSync(
        `./results/filmaffinity-movies.json`,
        JSON.stringify(filmaffinity_movies)
      );

      await browser.close();
    } catch (error) {
      console.log("ERROR", error);
    }
  }
})();

function get_just_watch_url_movie_title({ tmdb_id, tmdb_movies, imdb_movies }) {
  const imdb_movie_id = tmdb_movies[tmdb_id];
  return imdb_movies[imdb_movie_id].just_watch_id;
}

async function get_filmaffinity_movies() {
  return JSON.parse(fs.readFileSync(FILMAFFINITY_MOVIES_FILE_PATH, "utf8"));
}

async function get_imdb_movies() {
  return JSON.parse(fs.readFileSync(IMDB_MOVIES_FILE_PATH, "utf8"));
}

async function get_tmdb_movies() {
  return JSON.parse(fs.readFileSync(TMDB_MOVIES_FILE_PATH, "utf8"));
}

async function get_tmdb_movies_ids({
  filmaffinity_movies,
}) {
  const filmaffinity_movies_ids = Object.keys(filmaffinity_movies);
  const tmdb_movies = await JSON.parse(
    fs.readFileSync(TMDB_MOVIES_FILE_PATH, "utf8")
  );

  const tmdb_ids = Object.keys(tmdb_movies);
  return tmdb_ids.filter(
    (tmdb_id) => !filmaffinity_movies_ids.includes(tmdb_id)
  );
}

async function director_and_cast_and_year({
  page,
  directors,
  cast,
  year,
  directors_number = 5,
  cast_number = 5,
  year_enabled = true,
}) {
  await tituloCheckBox(page, false);
  await directorCheckBox(page, true);
  await repartoCheckBox(page, true);
  if (year_enabled) {
    await set_year(page, year);
  }

  await page.evaluate(
    (directors, cast) => {
      return (document.querySelectorAll(
        'input[type="text"]'
      )[2].value = `${directors.join(";")};${cast.join(";")}`);
    },
    directors.filter((_, index) => index < directors_number),
    cast.filter((_, index) => index < cast_number)
  );
  await click_search(page);
}

async function get_number_of_results(page) {
  return await page.evaluate(() => {
    if (document.querySelectorAll(".float-right").length > 0) {
      return document
        .querySelectorAll(".float-right")[0]
        .textContent.split(" ")[0];
    }
    return -1;
  });
}

async function set_year(page, year = "- - - -") {
  await page.evaluate((year) => {
    return (document.querySelectorAll("[name='fromyear']")[0].value = year);
  }, year);
  await page.evaluate((year) => {
    return (document.querySelectorAll("[name='toyear']")[0].value = year);
  }, year);
}

async function tituloCheckBox(page, checkbox) {
  await page.evaluate((checkbox) => {
    return (document.querySelectorAll('input[type="checkbox"]')[1].checked =
      checkbox);
  }, checkbox);
}

async function directorCheckBox(page, checkbox) {
  await page.evaluate((checkbox) => {
    return (document.querySelectorAll('input[type="checkbox"]')[1].checked =
      checkbox);
  }, checkbox);
}

async function repartoCheckBox(page, checkbox) {
  await page.evaluate((checkbox) => {
    return (document.querySelectorAll('input[type="checkbox"]')[2].checked =
      checkbox);
  }, checkbox);
}

async function click_search(page) {
  await page.click("#adv-search-button");
  await delay(500);
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
