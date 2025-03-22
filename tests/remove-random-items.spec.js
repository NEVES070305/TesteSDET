const { test, expect } = require('@playwright/test');
const { navigateToLoginPage } = require('../actions/navigationAction');
const { login, verifyLoginSuccess } = require('../actions/loginAction');
const { verifyCartBadgeCount, addDistinctRandomItemsToCart } = require('../actions/inventoryAction');
const { removeRandomItemsFromInventory } = require('../actions/removeItemAction');
const { verifyProductsNotInCart } = require('../actions/cartAction');
const selectors = require('../utils/selectors');
const users = require('../utils/users');


test.describe('Remover Itens Aleatórios do Carrinho (a partir da Inventory)', () => {
  test.beforeEach(async ({ page }) => {
    // Login com um usuário válido
    const validUser = users.find(u => u.valid);
    if (!validUser) throw new Error('Nenhum usuário válido disponível.');

    await navigateToLoginPage(page);
    await login(page, validUser.username, validUser.password);
    await verifyLoginSuccess(page, selectors.homePageTitle);
  });

  test('Deve adicionar itens aleatórios e remover parte deles, verificando a contagem carrinho', async ({ page }) => {

    const addedItems = await addDistinctRandomItemsToCart(page);

    var countToAdd = addedItems.length;
    await verifyCartBadgeCount(page, countToAdd);

    const { finalCount, _, __ } = await removeRandomItemsFromInventory(page, addedItems, countToAdd);

    await verifyCartBadgeCount(page, finalCount);
  });

  test('Deve adicionar itens aleatórios e remover parte deles, verificando presença no carrinho', async ({ page }) => {

    const addedItems = await addDistinctRandomItemsToCart(page);

    var countToAdd = addedItems.length;
    await verifyCartBadgeCount(page, countToAdd);

    const { _, itemsToRemove, itemsToKeep } = await removeRandomItemsFromInventory(page, addedItems, countToAdd);

    await page.click(selectors.cartLink);

    await verifyProductsNotInCart(page, selectors.cartItemsSelected, itemsToRemove, itemsToKeep);
  });
});
