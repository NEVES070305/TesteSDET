const { expect } = require('@playwright/test');
const selectors = require('../../utils/selectors');
/**
 * Preenche o formulário de checkout (Step One) e clica no botão "Continue".
 *
 * @param {import('@playwright/test').Page} page - A página do Playwright.
 * @param {string} firstName - Primeiro nome do usuário.
 * @param {string} lastName - Sobrenome do usuário.
 * @param {string} postalCode - CEP/Postal code.
 */
async function checkoutStepOne(page, firstName, lastName, postalCode) {
  await page.waitForSelector(selectors.firstNameInput, { timeout: 5000 });
  await page.fill(selectors.firstNameInput, firstName);
  await page.fill(selectors.lastNameInput, lastName);
  await page.fill(selectors.postalCodeInput, postalCode);
  
  await page.click(selectors.continueButton);
  await expect(page).toHaveURL(/checkout-step-two\.html$/);
}


/**
 * Preenche parcialmente o formulário de checkout (Step One) para simular dados incompletos e clica em "Continue".
 * Espera que uma mensagem de erro seja exibida.
 *
 * @param {import('@playwright/test').Page} page - A instância da página do Playwright.
 * @param {string} firstName - Primeiro nome (obrigatório).
 * @param {string} lastName - Sobrenome (obrigatório).
 * @param {string} postalCode - CEP; neste caso, passaremos uma string vazia para simular dados incompletos.
 */
async function checkoutStepOneIncomplete(page, firstName, lastName, postalCode) {
  await page.waitForSelector(selectors.firstNameInput, { timeout: 5000 });
  await page.fill(selectors.firstNameInput, firstName);
  await page.fill(selectors.lastNameInput, lastName);
  
  if (postalCode) {
    await page.fill(selectors.postalCodeInput, postalCode);
  }
  
  await page.click(selectors.continueButton);
  
  // Verifica se a mensagem de erro está visível
  await expect(page.locator(selectors.errorMessage)).toBeVisible();
}

module.exports = { checkoutStepOne, checkoutStepOneIncomplete };