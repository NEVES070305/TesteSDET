/**
 * Remove aleatoriamente uma quantidade de itens do carrinho a partir dos itens adicionados.
 * 
 * @param {import('@playwright/test').Page} page - A página do Playwright.
 * @param {Array<{ id: string, name: string }>} addedItems - Array de itens adicionados.
 * @param {number} countToAdd - Número total de itens adicionados (normalmente addedItems.length).
 * @returns {Promise<{ finalCount: number, itemsToRemove: Array, itemsToKeep: Array }>}
 */

async function removeRandomItemsFromInventory(page, addedItems, countToAdd) {
  
  let removeCount;
  if (countToAdd === 1) {
    removeCount = 1; 
  } else {
    // Remove aleatoriamente entre 1 e countToAdd - 1 itens
    removeCount = Math.floor(Math.random() * (countToAdd - 1)) + 1;
  }

  // Embaralha os itens adicionados usando o algoritmo Fisher-Yates
  const shuffled = [...addedItems];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Seleciona os primeiros removeCount itens para remoção e os demais para manter
  const itemsToRemove = shuffled.slice(0, removeCount);
  const itemsToKeep = shuffled.slice(removeCount);

  // Remove cada item selecionado, chamando a função que remove o item específico
  for (const item of itemsToRemove) {
    console.log(itemsToRemove);
    console.log(item.id);
    await removeSpecificItemFromInventory(page, item.id);
  }

  const finalCount = countToAdd - removeCount;
  return { finalCount, itemsToRemove, itemsToKeep };
}

async function removeSpecificItemFromInventory(page, itemID) {
  const escapedId = cssEscape(itemID);
  const removeButtonSelector = `#remove-${escapedId}`;
  
  await page.waitForSelector(removeButtonSelector, { timeout: 5000 });
  await page.click(removeButtonSelector);
}

function cssEscape(value) {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(value);
  } else {
    return value.replace(/([^a-zA-Z0-9_-])/g, '\\$1');
  }
}

module.exports = { removeSpecificItemFromInventory, removeRandomItemsFromInventory };