const { test } = require('@playwright/test');
const { navigateToLoginPage } = require('../../actions/navigation/navigationAction');
const { login, verifyLoginSuccess } = require('../../actions/login/loginAction');
const { viewAndVerifyRandomProductDetails } = require('../../actions/inventory/productDetailsAction');
const selectors = require('../../utils/selectors');
const users = require('../../utils/users');

test('Verifica detalhes do produto ao clicar em um item', async ({ page }) => {
  const validUser = users.find(u => u.valid);
  if (!validUser) throw new Error('Nenhum usuário válido disponível.');

  // Navega para a página de login e realiza o login
  await navigateToLoginPage(page);
  await login(page, validUser.username, validUser.password);
  await verifyLoginSuccess(page, selectors.homePageTitle);

  await viewAndVerifyRandomProductDetails(page);
});
