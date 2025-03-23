const { expect } = require('@playwright/test');
const selectors = require('../../utils/selectors');

async function cancelCheckoutStepTwo(page) {
  await page.click(selectors.cancelButton);
  await expect(page).toHaveURL(/inventory\.html$/);
}

async function cancelCheckoutStepOne(page) {
  await page.click(selectors.cancelButton);
  await expect(page).toHaveURL(/cart\.html$/);
}

module.exports = { cancelCheckoutStepTwo, cancelCheckoutStepOne };