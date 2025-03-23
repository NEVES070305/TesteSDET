const { expect } = require('@playwright/test');
const selectors = require('../../utils/selectors');

async function verifyCheckoutPrices(page, expectedSubtotal, taxRate = 0.08) {
  // Extrai o subtotal exibido na página
  const subtotalText = await page.$eval(selectors.summarySubtotalLabel, el => el.textContent);
  const actualSubtotal = parseFloat(subtotalText.replace('Item total: $', '').trim());
  expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);
  
  // Calcula o imposto esperado
  const expectedTax = parseFloat((expectedSubtotal * taxRate).toFixed(2));
  const taxText = await page.$eval(selectors.summaryTaxLabel, el => el.textContent);
  const actualTax = parseFloat(taxText.replace('Tax: $', '').trim());
  expect(actualTax).toBeCloseTo(expectedTax, 2);
  
  // Calcula o total esperado
  const expectedTotal = parseFloat((expectedSubtotal + expectedTax).toFixed(2));
  const totalText = await page.$eval(selectors.summaryTotalLabel, el => el.textContent);
  const actualTotal = parseFloat(totalText.replace('Total: $', '').trim());
  expect(actualTotal).toBeCloseTo(expectedTotal, 2);
}

module.exports = { verifyCheckoutPrices };
