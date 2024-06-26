const { test, expect, chromium, firefox, webkit } = require("@playwright/test");
const { email, password } = require('../user');


test('Successful authorization', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.waitForSelector('[placeholder="Email"]');
  await page.waitForSelector('[placeholder="Пароль"]');
  await page.fill('[placeholder="Email"]', email);
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('[data-testid="login-submit-btn"]');
  await page.waitForSelector('h2');
  await expect(page.locator('h2')).toContainText('Моё обучение');
  await page.screenshot({ path: 'screenshotSuccessful.png', fullPage: true });
});

test('Failed authorization', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.waitForSelector('[placeholder="Email"]');
  await page.waitForSelector('[placeholder="Пароль"]');
  await page.fill('[placeholder="Email"]', 'incorrectEmail@yandex.ru');
  await page.fill('[placeholder="Пароль"]', 'incorrectPassport');
  await page.click('[data-testid="login-submit-btn"]');
  await page.waitForSelector('[data-testid="login-error-hint"]');
  const errorMessage = await page.locator('[data-testid="login-error-hint"]').innerText();
  expect(errorMessage).toContain('Вы ввели неправильно логин или пароль');
  await page.screenshot({ path: 'screenshotFailed.png', fullPage: true });
});