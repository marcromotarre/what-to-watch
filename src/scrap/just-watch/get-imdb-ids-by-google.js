const fs = require("fs");
const puppeteer = require("puppeteer");

const JUST_WATCH_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/just-watch/results/just-watch-movies.json";
const IMDB_FILE_PATH =
  "/Users/marc.romo@attackiq.com/Documents/front/what-to-watch/src/scrap/imdb/results/imdb-movies.json";

(async () => {
  let imdb_movies = await get_imdb_movies();
  const just_watch_movies = await get_just_watch_movies_ids(imdb_movies);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 2600 });

  for (const [index, just_watch_movie] of just_watch_movies.entries()) {
    await delay(randomIntFromInterval(1000, 5000));
    const only_just_watch_title = just_watch_movie.replace("/es/pelicula/", "");
    await page.goto(
      `https://www.google.com/search?q=${only_just_watch_title}+imdb`
    );
    const imdb_id = await get_imdb_id(page);
    if (imdb_id !== null) {
      imdb_movies[imdb_id] = just_watch_movie;
      save_files(imdb_movies);
      console.log(index, " / ", just_watch_movies.length);
    } else {
      await page.screenshot({
        path: `screenshots/${only_just_watch_title}.jpg`,
      });
      console.log("not_found ", just_watch_movie);
    }
  }
  await browser.close();
})();

async function get_imdb_id(page) {
  try {
    const href = await page.evaluate(() => {
      return document
        .querySelectorAll("div.kvH3mc")[0]
        .children[0].children[0].children[0].getAttribute("href");
    });
    const imdb_id = href
      .replace("https://www.imdb.com/title/", "")
      .replace("/", "");
    if (!imdb_id.startsWith("tt") || imdb_id.endsWith("tt")) {
      throw "myException";
    }
    return imdb_id;
  } catch {
    try {
      const href = await page.evaluate(() => {
        return document
          .querySelectorAll("div.MjjYud")[0]
          .children[0].children[1].children[0].children[0].children[0].children[0].children[0].children[0].getAttribute(
            "href"
          );
      });
      const imdb_id =  href.replace("https://www.imdb.com/title/", "").replace("/", "");
      if (!imdb_id.startsWith("tt") || imdb_id.endsWith("fullcredits")) {
        throw "myException";
      }
    } catch {
      return null;
    }
  }
}

async function save_files(imdb_movies) {
  await fs.writeFileSync(IMDB_FILE_PATH, JSON.stringify(imdb_movies));
}

async function get_just_watch_movies_ids(imdb_movies) {
  const just_watch_ids_in_imdb = Object.keys(imdb_movies).map(
    (imdb_id) => imdb_movies[imdb_id]
  );

  const just_watch_movies_ids = Object.keys(
    JSON.parse(fs.readFileSync(JUST_WATCH_FILE_PATH, "utf8"))
  );

  const new_just_watch_movies_ids = just_watch_movies_ids.filter(
    (just_watch_movies_id) => {
      return !just_watch_ids_in_imdb.includes(just_watch_movies_id);
    }
  );

  return new_just_watch_movies_ids;
}

async function get_imdb_movies() {
  return JSON.parse(fs.readFileSync(IMDB_FILE_PATH, "utf8"));
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
