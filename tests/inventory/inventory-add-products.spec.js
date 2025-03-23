const { test } = require('@playwright/test');
const { navigateToLoginPage } = require('../../actions/navigation/navigationAction');
const { login, verifyLoginSuccess } = require('../../actions/login/loginAction');
const { addRandomItemToCart, verifyCartBadgeCount } = require('../../actions/inventory/inventoryAction');
const selectors = require('../../utils/selectors');
const users = require('../../utils/users');

test.describe('Adiciona item aleatório e verificar quantidade', () => {
  test.beforeEach(async ({ page }) => {
    const validUser = users.find(u => u.valid);
    if (!validUser) throw new Error('Nenhum usuário válido disponível.');
    await navigateToLoginPage(page);
    await login(page, validUser.username, validUser.password);
    await verifyLoginSuccess(page, selectors.homePageTitle);
  });

  test('Deve adicionar um item aleatório e verificar que a quantidade é 1', async ({ page }) => {
    await addRandomItemToCart(page);

    await verifyCartBadgeCount(page, 1);
  });
});
