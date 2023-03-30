const fs = require("fs");
const puppeteer = require("puppeteer");

const JUST_WATCH_FILE_PATH = "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/just_watch/results/just-watch-movies.json";
const IMDB_FILE_PATH = "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/imdb/results/imdb-movies.json";
const JUST_WATCH_MOVIES_NOT_FOUND_FILE_PATH = "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/just_watch/results/just-watch-movies_not_found.json";

(async () => {
  let not_found_movies = await get_not_found_movies();
  let imdb_movies = await get_imdb_movies();
  const just_watch_movies = await get_just_watch_movies_ids({
    imdb_movies,
    not_found_movies,
  });


  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 2600 });

  for (const [index, just_watch_movie] of just_watch_movies.entries()) {
    await page.goto(`https://www.justwatch.com${just_watch_movie}`);
    const imdb_id = await get_imdb_id(page);
    if(imdb_id) {
      imdb_movies[imdb_id] = just_watch_movie;
    } else {
      not_found_movies.push(just_watch_movie)
    }

    console.log(index, "/", just_watch_movies.length, " - ", just_watch_movie, imdb_id)
    await save_files({ imdb_movies, not_found_movies });
  }
  await browser.close();
})();

async function get_imdb_id(page) {
  try {
    const imdbUrl = await page.evaluate(() => {
      return document
        .querySelectorAll('[v-uib-tooltip="IMDB"]')[0]
        .querySelectorAll("a[href]")[0]
        .getAttribute("href");
    });

    const imdb_id = imdbUrl
      .split("https://www.imdb.com/title/")[1]
      .split("/?ref_=justwatch")[0];

    return imdb_id;
  } catch {
    return null;
  }
}

async function save_files({ imdb_movies, not_found_movies }) {
  await fs.writeFileSync(IMDB_FILE_PATH, JSON.stringify(imdb_movies));
  await fs.writeFileSync(
    JUST_WATCH_MOVIES_NOT_FOUND_FILE_PATH,
    JSON.stringify(not_found_movies)
  );
}

async function get_just_watch_movies_ids({ imdb_movies, not_found_movies }) {
  const just_watch_ids_in_imdb = Object.keys(imdb_movies).map(
    (imdb_id) => imdb_movies[imdb_id]
  );

  const just_watch_movies_ids = Object.keys(
    JSON.parse(fs.readFileSync(JUST_WATCH_FILE_PATH, "utf8"))
  );

  const new_just_watch_movies_ids = just_watch_movies_ids.filter(
    (just_watch_movies_id) => {
      return (
        !just_watch_ids_in_imdb.includes(just_watch_movies_id) &&
        !not_found_movies.includes(just_watch_movies_id)
      );
    }
  );

  return new_just_watch_movies_ids;
}

async function get_imdb_movies() {
  return JSON.parse(fs.readFileSync(IMDB_FILE_PATH, "utf8"));
}

async function get_not_found_movies() {
  return JSON.parse(
    fs.readFileSync(JUST_WATCH_MOVIES_NOT_FOUND_FILE_PATH, "utf8")
  );
}
