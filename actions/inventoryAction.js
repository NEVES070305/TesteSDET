/**
 * Seleciona a opção de ordenação no dropdown.
 * 
 * @param {import('@playwright/test').Page} page
 * @param {string} sortOption
 */
const { expect } = require('@playwright/test');
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

async function getTotalProductsCount(page) {
  await page.waitForSelector(selectors.inventoryItem);
  const items = await page.$$(selectors.inventoryItem);
  return items.length;
}

async function addSpecificItemToCart(page, itemID) {
  const addButtonSelector = `button[data-test="add-to-cart-${itemID}"]`;
  await page.waitForSelector(addButtonSelector, { timeout: 5000 });
  await page.click(addButtonSelector);
}

async function addRandomItemToCart(page) {
  await page.waitForSelector(selectors.inventoryItem);
  const items = await page.$$(selectors.inventoryItem);
  if (items.length === 0) {
    throw new Error('Nenhum item encontrado no inventário.');
  }

  const randomIndex = Math.floor(Math.random() * items.length);
  const randomItem = items[randomIndex];
  const addButton = await randomItem.$(selectors.buttonAdd);
  if (!addButton) {
    throw new Error('Botão de adicionar não encontrado para o item selecionado.');
  }

  const dataTestAttr = await addButton.getAttribute('data-test');
  const itemID = dataTestAttr.replace('add-to-cart-', '');
  
  // Chama a função para adicionar o item específico
  await addSpecificItemToCart(page, itemID);

  // Retorna o nome do produto (opcional)
  const productName = await randomItem.$eval(selectors.inventoryItemName, el => el.textContent.trim());
  return productName;
}

async function addDistinctRandomItemsToCart(page) {
  // Obtém a quantidade total de produtos disponíveis
  const totalProducts = await getTotalProductsCount(page);

  // Escolhe aleatoriamente um número entre 1 e totalProducts
  const count = Math.floor(Math.random() * totalProducts) + 1;
  if (totalProducts < count) {
    throw new Error(`Requisitado ${count} itens, mas apenas ${totalProducts} disponíveis.`);
  }
  
  const items = await page.$$(selectors.inventoryItem);
  
  // Cria um array de índices e embaralha-os (Fisher-Yates)
  const indices = Array.from({ length: items.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Seleciona os primeiros "count" índices (itens distintos)
  const selectedIndices = indices.slice(0, count);
  
  const addedProductNames = [];
  for (const index of selectedIndices) {
    const item = items[index];
    const addButton = await item.$(selectors.buttonAdd);
    if (!addButton) {
      throw new Error('Botão de adicionar não encontrado para um item selecionado.');
    }
    const dataTestAttr = await addButton.getAttribute('data-test');
    const itemID = dataTestAttr.replace('add-to-cart-', '');
    await addSpecificItemToCart(page, itemID);
    const productName = await item.$eval(selectors.inventoryItemName, el => el.textContent.trim());
    addedProductNames.push({ id: itemID, name: productName });
  }
  return addedProductNames;
}

async function verifyCartBadgeCount(page, expectedCount) {
  await page.waitForSelector(selectors.cartBadge, { timeout: 5000 });
  await expect(page.locator(selectors.cartBadge)).toHaveText(String(expectedCount));
}

module.exports = { sortInventory, getProductNames, getProductPrices, addSpecificItemToCart,  addRandomItemToCart, verifyCartBadgeCount, addDistinctRandomItemsToCart };