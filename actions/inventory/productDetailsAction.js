const { expect } = require('@playwright/test');
const selectors = require('../../utils/selectors');

/**
 * Seleciona aleatoriamente um produto da lista de inventário, clica nele e verifica os detalhes da página.
 *
 * @param {import('@playwright/test').Page} page - A instância da página do Playwright.
 * @returns {Promise<string>} - O nome do produto que foi selecionado.
 */
async function viewAndVerifyRandomProductDetails(page) {
  // Aguarda que os produtos estejam visíveis e usa um locator para os nomes dos produtos
  const productsLocator = page.locator(selectors.inventoryItemName);
  const count = await productsLocator.count();
  
  if (count === 0) {
    throw new Error('Nenhum produto disponível na lista.');
  }
  
  // Seleciona aleatoriamente um índice
  const randomIndex = Math.floor(Math.random() * count);
  const productName = await productsLocator.nth(randomIndex).textContent();
  
  // Clica no produto selecionado
  await productsLocator.nth(randomIndex).click();
  
  // Aguarda a navegação para a página de detalhes do produto (ex.: "inventory-item.html")
  await expect(page).toHaveURL(/inventory-item\.html/);
  
  // Verifica se o nome do produto na página de detalhes confere com o nome clicado
  const detailName = await page.locator(selectors.productDetailName).textContent();
  expect(detailName.trim()).toBe(productName.trim());
  
  // Verifica se o preço está no formato esperado, ex.: "$29.99"
  const priceText = await page.locator(selectors.productDetailPrice).textContent();
  expect(priceText).toMatch(/\$\d+\.\d{2}/);
  
  // Verifica se a imagem do produto está visível
  await expect(page.locator(selectors.productDetailImage)).toBeVisible();
  
  return productName.trim();
}

module.exports = { viewAndVerifyRandomProductDetails };
