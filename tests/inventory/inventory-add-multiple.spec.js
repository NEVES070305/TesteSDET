const { test } = require('@playwright/test');
const { navigateToLoginPage } = require('../../actions/navigation/navigationAction');
const { login, verifyLoginSuccess } = require('../../actions/login/loginAction');
const { addDistinctRandomItemsToCart, verifyCartBadgeCount } = require('../../actions/inventory/inventoryAction');
const selectors = require('../../utils/selectors');
const users = require('../../utils/users');

test.describe('Adicionar Itens Distintos ao Carrinho e Verificar Quantidade', () => {
  test.beforeEach(async ({ page }) => {
    const validUser = users.find(u => u.valid);
    if (!validUser) throw new Error('Nenhum usuário válido disponível.');
    await navigateToLoginPage(page);
    await login(page, validUser.username, validUser.password);
    await verifyLoginSuccess(page, selectors.homePageTitle);
  });

  test('Deve adicionar uma quantidade aleatória de itens distintos e verificar a quantidade', async ({ page }) => {
    var addedProductNames = await addDistinctRandomItemsToCart(page);
    
    // Verifica se o badge do carrinho mostra a quantidade correta
    await verifyCartBadgeCount(page, addedProductNames.length);
  });
});
