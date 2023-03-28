const puppeteer = require("puppeteer");
const fs = require("fs");
const process = require("process");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");

const movies = {};

const PLATFORMS = [
  "hbo-max",
  "apple-tv-plus",
  "netflix-basic-with-ads",
  "netflix",
  "disney",
  "amazon-prime-video",
  "filmin",
  "movistar-plus",
  "filmin-plus",
  "skyshowtime",
  "atres-player",
];

const PLATFORMS_FILE_PATH = "./results/platforms.json";
const MOVIES_FILE_PATH = "./results/movies-by-platforms.json";

(async () => {
  let platforms_counted = {};
  PLATFORMS.forEach((platform) => {
    platforms_counted[platform] = {
      total_movies: 0,
    };
  });

  let platform = "";
  let url_name_ = "";
  const movies = {};

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    request.continue();
  });

  page.on("response", async (response) => {
    if (
      response.url() === "https://apis.justwatch.com/graphql" &&
      response.status() === 200
    ) {
      try {
        const text = await response.text();
        const responseText = JSON.parse(text);
        if (responseText?.data?.popularTitles) {
          if (!platforms_counted[platform])
            platforms_counted[platform] = { total_movies: 0 };
          platforms_counted[platform] = {
            total_movies:
              platforms_counted[platform].total_movies <
              responseText.data.popularTitles.totalCount
                ? responseText.data.popularTitles.totalCount
                : platforms_counted[platform].total_movies,
          };
          responseText.data.popularTitles.edges.forEach((edge) => {
            if (!movies[edge.node.content.fullPath]) {
              movies[edge.node.content.fullPath] = {};
            }
            movies[edge.node.content.fullPath][platform] = true;
            movies[edge.node.content.fullPath][
              `${platform}-${url_name_}`
            ] = true;
          });
        }
      } catch (error) {}
    }
  });

  for (const index_platform in PLATFORMS) {
    platform = PLATFORMS[index_platform];
    console.log(`scraping ${platform}`);
    const scrap_urls = get_scrap_urls(platform);
    for (const index_scrap_url in scrap_urls) {
      console.log(
        platform,
        platforms_counted[platform].total_movies,
        get_number_of_movies_by_platform({
          movies,
          platform,
        })
      );
      if (
        platforms_counted[platform].total_movies > 0 &&
        platforms_counted[platform].total_movies ===
          get_number_of_movies_by_platform({
            movies,
            platform,
          })
      ) {
        continue;
      }

      const { name: url_name, url } = scrap_urls[index_scrap_url];
      console.log(`${platform} ${url}`);
      await page.goto(url);
      url_name_ = url_name;

      let repeated = 0;
      let actual_movies = 0;

      while (repeated < 2) {
        const number_of_movies_by_platform = get_number_of_movies_by_platform({
          movies,
          platform: `${platform}-${url_name}`,
        });
        if (
          actual_movies > 0 &&
          actual_movies === number_of_movies_by_platform
        ) {
          repeated++;
        }
        actual_movies = get_number_of_movies_by_platform({
          movies,
          platform: `${platform}-${url_name}`,
        });
        await scrollPageToBottom(page, { size: 500 });
        /*console.log(
          "Number of movies: ",
          url_name,
          actual_movies,
          get_number_of_movies_by_platform({
            movies,
            platform: `${platform}-${url_name}`,
          })
        );*/
      }
      console.log(get_number_of_movies_by_platform({
        movies,
        platform: `${platform}-${url_name}`,
      }), " / ", platforms_counted[platform].total_movies)
    }
    await save_file({ movies, platforms_counted });
  }
  await browser.close();
})();

function get_number_of_movies_by_platform({ movies, platform }) {
  return Object.keys(movies)
    .map((movie_url) => {
      const movie_platforms = Object.keys(movies[movie_url]);
      return movie_platforms.includes(platform);
    })
    .filter((value) => value === true).length;
}

async function save_file({ movies, platforms_counted }) {
  for (platform in platforms_counted) {
    platforms_counted[platform].scraped_movies =
      get_number_of_movies_by_platform({ movies, platform });
  }

  await fs.writeFileSync(
    PLATFORMS_FILE_PATH,
    JSON.stringify(platforms_counted)
  );

  const movies_formatted = {};
  Object.keys(movies).forEach((movie_id) => {
    movies_formatted[movie_id] = Object.keys(movies[movie_id]).filter(
      (platform) => PLATFORMS.includes(platform)
    );
  });

  await fs.writeFileSync(MOVIES_FILE_PATH, JSON.stringify(movies_formatted));
}

const get_scrap_urls = (platform) => {
  return [
    {
      name: "peliculas",
      url: `https://www.justwatch.com/es/proveedor/${platform}/peliculas`,
    },
    {
      name: "trending_7_day",
      url: `https://www.justwatch.com/es/proveedor/${platform}/peliculas?sort_by=trending_7_day`,
    },
    {
      name: "random",
      url: `https://www.justwatch.com/es/proveedor/${platform}/peliculas?sort_by=random&sort_asc=true&sorting_random_seed=2`,
    },
    {
      name: "imdb",
      url: `https://www.justwatch.com/es/proveedor/${platform}/peliculas?sort_by=imdb_score`,
    },
    {
      name: "title",
      url: `https://www.justwatch.com/es/proveedor/${platform}/peliculas?sort_by=title&sort_asc=true`,
    },
    {
      name: "release_year",
      url: `https://www.justwatch.com/es/proveedor/${platform}/peliculas?sort_by=release_year`,
    },
    {
      name: "tmdb",
      url: `https://www.justwatch.com/es/proveedor/${platform}/peliculas?sort_by=tmdb_popularity`,
    },
  ];
};

const scrapeInfiniteScrollItems = async (page, itemTargetCount) => {
  let items = [];

  while (itemTargetCount > items.length) {
    items = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll("#boxes > div"));
      return items.map((item) => item.innerText);
    });

    previousHeight = await page.evaluate("document.body.scrollHeight");
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    await page.waitForFunction(
      `document.body.scrollHeight > ${previousHeight}`
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return items;
};

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        console.log(totalHeight, scrollHeight - window.innerHeight);
        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

/*
(async () => {
 
  for (let i = 0; i < URLS.length; i++) {
    console.log(URLS[i].url);
    provider = {
      platform,
      totalMovies: 999999999,
      movies: {},
    };
    let actualMovies = 999999;
    await page.goto(URLS[i].url);
    for (
      let i = 0;
      i < 10 && Object.keys(provider.movies).length !== actualMovies;
      i++
    ) {
      console.log(
        "let's give another try ",
        actualMovies,
        " - ",
        Object.keys(provider.movies).length
      );
      actualMovies = Object.keys(provider.movies).length;
      await autoScroll(page);
    }
    fs.writeFileSync(
      `just-watch-${platform}-${URLS[i].name}.json`,
      JSON.stringify(provider)
    );
  }

  await browser.close();
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
*/
