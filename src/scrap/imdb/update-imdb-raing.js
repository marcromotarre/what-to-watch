const puppeteer = require('puppeteer');

(async () => {
  // Launch browser and open a new page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto('https://www.imdb.com/title/tt0993846/');

  // Wait for the ratings section to be visible
  //await page.waitForSelector('.ratingValue');

  // Extract the score and votes
  const score = await page.$eval('[data-testid="hero-rating-bar__aggregate-rating__score"]', el => el.textContent);
  //const votes = await page.$eval('.ratingValue span[itemprop="ratingCount"]', el => el.textContent);

  console.log(`IMDB score: ${score}`);
 // console.log(`Votes: ${votes}`);

  // Close the browser
  await browser.close();
})();