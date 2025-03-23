const URL = 'https://www.saucedemo.com/';

/** Navega até a página de login.
 * @param {import('@playwright/test').Page} page - A instância da página do Playwright.
 */
async function navigateToLoginPage(page) {
  await page.goto(URL);
}

module.exports = { navigateToLoginPage };