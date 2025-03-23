const { test, expect } = require('@playwright/test');
const { addDistinctRandomItemsToCart } = require('../actions/inventoryAction');
const { navigateToLoginPage } = require('../actions/navigationAction');
const { login, verifyLoginSuccess } = require('../actions/loginAction');
const { goToCheckoutStepOne } = require('../actions/checkoutNavigationAction');
const { checkoutStepOneIncomplete } = require('../actions/checkoutAction');
const selectors = require('../utils/selectors');
const users = require('../utils/users');

test('Deve exibir erro ao tentar continuar checkout sem preencher todos os dados', async ({ page }) => {
  // Seleciona um usuário válido
  const validUser = users.find(u => u.valid);
  if (!validUser) throw new Error('Nenhum usuário válido disponível.');

  // Navega para a página de login e realiza o login
  await navigateToLoginPage(page);
  await login(page, validUser.username, validUser.password);
  await verifyLoginSuccess(page, selectors.homePageTitle);

  await addDistinctRandomItemsToCart(page);

  await goToCheckoutStepOne(page);

  // Tenta avançar com dados incompletos
  await checkoutStepOneIncomplete(page, 'John', 'Doe', '');
});
