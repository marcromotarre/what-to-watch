const puppeteer = require("puppeteer");
const fs = require("fs");

const GET_GOOGLE_URL = (id) =>
  `https://www.google.com/search?q=filmaffinity+film${id}`;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto(GET_GOOGLE_URL(576352));
  // simple selector for search box

  await page.waitForSelector("h3.LC20lb", { timeout: 10000 });
  await page.evaluate(() => {
    let elements = document.querySelectorAll("h3.LC20lb");
    // "for loop" will click all element not random
    let randomIndex = 0;
    elements[randomIndex].click();
  });
})();
