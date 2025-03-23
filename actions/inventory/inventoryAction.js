const { expect } = require('@playwright/test');
const selectors = require('../../utils/selectors');

/**
 * Seleciona a opção de ordenação no dropdown.
 * 
 * @param {string} sortOption - Valor da opção de ordenação.
 */
async function sortInventory(page, sortOption) {
  await page.waitForSelector(selectors.sortDropdown, { timeout: 10000 });
  await page.selectOption(selectors.sortDropdown, sortOption);
}

/**
 * Retorna uma lista com os nomes dos produtos exibidos na tela.
 * 
 * @returns {Promise<string[]>} Array contendo os nomes dos produtos.
 */
async function getProductNames(page) {
  return await page.$$eval(selectors.productName, elements =>
    elements.map(el => el.textContent.trim())
  );
}

/**
 * Retorna uma lista com os preços dos produtos exibidos na tela.
 * 
 * @returns {Promise<number[]>} Array contendo os preços dos produtos em formato numérico.
 */
async function getProductPrices(page) {
  return await page.$$eval(selectors.productPrice, elements =>
    elements.map(el => parseFloat(el.textContent.replace('$', '')))
  );
}

/**
 * Retorna o número total de produtos.
 * 
 * @returns {Promise<number>} Quantidade total de produtos encontrados.
 */
async function getTotalProductsCount(page) {
  await page.waitForSelector(selectors.inventoryItem);
  const items = await page.$$(selectors.inventoryItem);
  return items.length;
}

/**
 * Adiciona um item específico ao carrinho.
 * 
 * @param {string} itemID - Identificador do item.
 */
async function addSpecificItemToCart(page, itemID) {
  const addButtonSelector = `button[data-test="add-to-cart-${itemID}"]`;
  await page.waitForSelector(addButtonSelector, { timeout: 5000 });
  await page.click(addButtonSelector);
}

/**
 * Adiciona aleatoriamente um item ao carrinho.
 * Retorna o nome do produto adicionado.
 * 
 * @returns {Promise<string>} Nome do produto que foi adicionado.
 */
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

/**
 * Adiciona aleatoriamente uma quantidade distinta de itens ao carrinho.
 * Retorna um array de objetos contendo o id e o nome dos produtos.
 * 
 * @returns {Promise<Array<{ id: string, name: string }>>} Array com os itens adicionados.
 */
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

/**
 * Verifica se o badge do carrinho exibe a quantidade esperada de itens.
 * 
 * @param {import('@playwright/test').Page} page - A instância da página do Playwright.
 * @param {number} expectedCount - Número esperado de itens no carrinho.
 */
async function verifyCartBadgeCount(page, expectedCount) {
  await page.waitForSelector(selectors.cartBadge, { timeout: 7500 });
  await expect(page.locator(selectors.cartBadge)).toHaveText(String(expectedCount));
}

module.exports = { sortInventory, getProductNames, getProductPrices, addSpecificItemToCart,  addRandomItemToCart, verifyCartBadgeCount, addDistinctRandomItemsToCart };