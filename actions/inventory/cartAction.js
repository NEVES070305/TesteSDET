const { expect } = require('@playwright/test');

/**
 * Verifica se todos os produtos passados estão presentes no carrinho.
 * 
 * @param {import('@playwright/test').Page} page
 * @param {string} cartItemsSelector - Seletor para os nomes dos produtos no carrinho.
 * @param {string[]} addedProductNames - Lista de nomes de produtos que devem estar presentes.
 */

async function verifyProductsInCart(page, cartItemsSelector, addedProductNames) {
  // Obtém os nomes dos produtos listados no carrinho
  const cartProductNames = await page.$$eval(cartItemsSelector, items =>
    items.map(el => el.textContent.trim())
  );
  
  // Verifica que cada produto adicionado aparece na lista do carrinho
  for (const productName of addedProductNames) {
    expect(cartProductNames).toContain(productName.name);
  }
}
 
async function verifyProductsNotInCart(page, cartItemsSelector, itemsToRemove, itemsToKeep) {
  // Utiliza o seletor passado para obter os nomes dos produtos no carrinho
  const cartProductNames = await page.$$eval(cartItemsSelector, elements =>
    elements.map(el => el.textContent.trim())
  );
  
  // Verifica que cada item que deveria ter sido removido não está presente
  for (const removed of itemsToRemove) {
    expect(cartProductNames).not.toContain(removed.name);
  }
  
  // Verifica que cada item que deveria permanecer está presente
  for (const kept of itemsToKeep) {
    expect(cartProductNames).toContain(kept.name);
  }
}

module.exports = { verifyProductsInCart, verifyProductsNotInCart };
