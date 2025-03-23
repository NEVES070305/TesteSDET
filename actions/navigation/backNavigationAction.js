const { expect } = require('@playwright/test');
const selectors = require('../../utils/selectors');

/**
 * Cancela o Checkout Step Two e retorna para a página de inventário.
 * @param {import('@playwright/test').Page} page - A instância da página do Playwright.
 */
async function cancelCheckoutStepTwo(page) {
  await page.click(selectors.cancelButton);
  await expect(page).toHaveURL(/inventory\.html$/);
}

/**
 * Cancela o Checkout Step One e retorna para a página do carrinho.
 * @param {import('@playwright/test').Page} page - A instância da página do Playwright.
 */
async function cancelCheckoutStepOne(page) {
  await page.click(selectors.cancelButton);
  await expect(page).toHaveURL(/cart\.html$/);
}

module.exports = { cancelCheckoutStepTwo, cancelCheckoutStepOne };