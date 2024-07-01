let page;

const { clickElement, getText, clickDay, clickMoviTime, clickSeat } = require("./lib/commands");
const { generateData } = require("./lib/util");

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Ticket booking", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Positive - Should book one seat", async () => {
    const data = generateData();
    const moviNumber = 2;
    const timeNumber = 2;
    const rowNumber = 5;
    const seatNumber = 5;
    await clickDay(page, data);
    await clickMoviTime(page, moviNumber, timeNumber);
    await page.waitForSelector("h1");
    await clickSeat(page, rowNumber, seatNumber);
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector("h1");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты");
  });

  test("Positive - Should book two seats", async () => {
    const data = generateData();
    const moviNumber = 2;
    const timeNumber = 2;
    const rowNumber1 = 10;
    const seatNumber1 = 5;
    const rowNumber2 = 10;
    const seatNumber2 = 6;
    await clickDay(page, data);
    await clickMoviTime(page, moviNumber, timeNumber);
    await page.waitForSelector("h1");
    await clickSeat(page, rowNumber1, seatNumber1);
    await clickSeat(page, rowNumber2, seatNumber2);
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector("h1");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты");
  });

  test("Negative - Should not book any seats", async () => {
    const data = generateData();
    const moviNumber = 2;
    const timeNumber = 2;
    await clickDay(page, data);
    await clickMoviTime(page, moviNumber, timeNumber);
    await page.waitForSelector("h1");
    await clickElement(page, ".acceptin-button");
    const actual = await page.$eval(".acceptin-button", (button) =>
      button.hasAttribute("disabled")
    );
    expect(actual).toBe(true);
  });
});
