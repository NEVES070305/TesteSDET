/**
 * Seleciona a opção de ordenação no dropdown.
 * 
 * @param {import('@playwright/test').Page} page
 * @param {string} sortOption
 */
const selectors = require('../utils/selectors');

async function sortInventory(page, sortOption) {
  await page.waitForSelector(selectors.sortDropdown, { timeout: 10000 });
  await page.selectOption(selectors.sortDropdown, sortOption);
}

async function getProductNames(page) {
  return await page.$$eval(selectors.productName, elements =>
    elements.map(el => el.textContent.trim())
  );
}

async function getProductPrices(page) {
  return await page.$$eval(selectors.productPrice, elements =>
    elements.map(el => parseFloat(el.textContent.replace('$', '')))
  );
}

module.exports = { sortInventory, getProductNames, getProductPrices };