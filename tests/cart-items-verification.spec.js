const { test } = require('@playwright/test');
const { navigateToLoginPage } = require('../actions/navigationAction');
const { login, verifyLoginSuccess } = require('../actions/loginAction');
const { addDistinctRandomItemsToCart } = require('../actions/inventoryAction');
const { verifyProductsInCart } = require('../actions/cartAction');
const selectors = require('../utils/selectors');
const users = require('../utils/users');

test.describe('Verificar Itens no Carrinho', () => {
  test.beforeEach(async ({ page }) => {
    const validUser = users.find(u => u.valid);
    if (!validUser) throw new Error('Nenhum usuário válido disponível.');
    await navigateToLoginPage(page);
    await login(page, validUser.username, validUser.password);
    await verifyLoginSuccess(page, selectors.homePageTitle);
  });

  test('Verificar que os itens adicionados aleatoriamente estão no carrinho', async ({ page }) => {

    const addedProductNames = await addDistinctRandomItemsToCart(page);
    
    await page.click(selectors.cartLink);
    
    await verifyProductsInCart(page, selectors.cartItemsSelected, addedProductNames);
  });
});
