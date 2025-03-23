const { test, expect } = require('@playwright/test');
const { navigateToLoginPage } = require('../../actions/navigation/navigationAction');
const { login, verifyLoginSuccess } = require('../../actions/login/loginAction');
const { checkoutStepOne } = require('../../actions/checkout/checkoutAction');
const { goToCheckoutStepOne } = require('../../actions/navigation/checkoutNavigationAction');
const { addDistinctRandomItemsToCart } = require('../../actions/inventory/inventoryAction');
const selectors = require('../../utils/selectors');
const users = require('../../utils/users');

test('Deve iniciar o processo de compra (Checkout Step One)', async ({ page }) => {
  const validUser = users.find(u => u.valid);
  if (!validUser) throw new Error('Nenhum usuário válido disponível.');

  await navigateToLoginPage(page);
  await login(page, validUser.username, validUser.password);
  await verifyLoginSuccess(page, selectors.homePageTitle);

  await addDistinctRandomItemsToCart(page);

  await goToCheckoutStepOne(page);

  // Preenche o formulário de checkout (Step One) e avança para o próximo passo
  await checkoutStepOne(page, 'John', 'Doe', '12345');
});
