const { expect } = require('@playwright/test');
const selectors = require('../../utils/selectors');

/**
 * Navega do carrinho para a tela de Checkout Step One.
 * @param {import('@playwright/test').Page} page - A instância da página do Playwright.
 */
async function goToCheckoutStepOne(page) {

  await page.click(selectors.cartLink);

  await expect(page).toHaveURL(/cart\.html$/);
  
  await page.click(selectors.checkoutButton);
  
  // Verifica que a URL corresponde à página de checkout-step-one
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
}

module.exports = { goToCheckoutStepOne };
