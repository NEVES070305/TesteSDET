const URL = 'https://www.saucedemo.com/';

async function navigateToLoginPage(page) {
  await page.goto(URL);
}

module.exports = { navigateToLoginPage };