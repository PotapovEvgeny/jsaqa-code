module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector ${selector} is not clickable`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  clickDay: async function (page, number) {
    try {
      let selector = `nav > a:nth-child(${number}) > span.page-nav__day-number`;
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector clickDay ${selector} is not clickable`);
    }
  },
  clickMoviTime: async function (page, movi, time) {
    try {
      let selector = `main > section:nth-child(${movi}) > div:nth-child(${time}) > ul > li > a`;
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector clickMoviTime ${selector} is not clickable`);
    }
  },
  clickSeat: async function (page, row, seat) {
    try {
      let selector = `main > section div:nth-child(${row}) > span:nth-child(${seat})`;
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector clickSeat ${selector} is not clickable`);
    }
  },
};
