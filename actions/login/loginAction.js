const { expect } = require('@playwright/test');
const selectors = require('../../utils/selectors');

async function login(page, username, password) {
  await page.fill(selectors.usernameInput, username);
  await page.fill(selectors.passwordInput, password);
  await page.click(selectors.loginButton);
}

async function verifyLoginSuccess(page, expectedTitle) {
  await page.waitForLoadState('load');
  await expect(page).toHaveTitle(expectedTitle);
  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.locator(selectors.inventoryList)).toBeVisible();
}

async function verifyLoginFailure(page, errorMessageSelector) {
  await expect(page.locator(errorMessageSelector)).toBeVisible();
}


module.exports = { login, verifyLoginSuccess, verifyLoginFailure };