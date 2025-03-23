const { test } = require('@playwright/test');
const { navigateToLoginPage } = require('../../actions/navigation/navigationAction');
const { login, verifyLoginSuccess } = require('../../actions/login/loginAction');
const { addDistinctRandomItemsToCart } = require('../../actions/inventory/inventoryAction');
const { goToCheckoutStepOne } = require('../../actions/checkout/checkoutNavigationAction');
const { checkoutStepOne } = require('../../actions/checkout/checkoutAction');
const { finishPurchase } = require('../../actions/inventory/finishPurchaseAction');
const selectors = require('../../utils/selectors');
const users = require('../../utils/users');

test('Finalização da compra - fluxo completo', async ({ page }) => {
  const validUser = users.find(u => u.valid);
  if (!validUser) throw new Error('Nenhum usuário válido disponível.');
  
  await navigateToLoginPage(page);
  await login(page, validUser.username, validUser.password);
  await verifyLoginSuccess(page, selectors.homePageTitle);
  
  await addDistinctRandomItemsToCart(page);
  
  await goToCheckoutStepOne(page);
  
  // Preenche o formulário do Checkout Step One e avança para o Checkout Step Two
  await checkoutStepOne(page, 'John', 'Doe', '12345');
  
  //Finaliza a compra clicando no botão "Finish"
  await finishPurchase(page);
});
