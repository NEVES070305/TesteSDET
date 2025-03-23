const { expect } = require('@playwright/test');
const selectors = require('../utils/selectors');

async function finishPurchase(page) {
  // Aguarda o botão de finalizar a compra e clica nele
  await page.waitForSelector(selectors.finishButton, { timeout: 5000 });
  await page.click(selectors.finishButton);

  // Verifica a URL 
  await expect(page).toHaveURL(/checkout-complete\.html$/);

  // Verifica se a mensagem de confirmação está visível
  await expect(page.locator(selectors.completeHeader)).toBeVisible();
}

module.exports = { finishPurchase };
