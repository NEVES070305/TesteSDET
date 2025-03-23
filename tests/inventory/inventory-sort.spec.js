const { test, expect } = require('@playwright/test');
const { navigateToLoginPage } = require('../../actions/navigation/navigationAction');
const { login, verifyLoginSuccess } = require('../../actions/login/loginAction');
const { sortInventory, getProductNames, getProductPrices } = require('../../actions/inventory/inventoryAction');
const selectors = require('../../utils/selectors');
const users = require('../../utils/users');

test.describe('Ordenação/Filtragem do Inventário', () => {
  test.beforeEach(async ({ page }) => {
    const validUser = users.find(u => u.valid);
    if (!validUser) throw new Error('Nenhum usuário válido disponível.');
    await navigateToLoginPage(page);
    await login(page, validUser.username, validUser.password);
    await verifyLoginSuccess(page, selectors.homePageTitle);
  });

  test('Ordenar produtos por Nome (A a Z)', async ({ page }) => {
    await sortInventory(page, 'az');
    const productNames = await getProductNames(page);
    
    const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
    expect(productNames).toEqual(sortedNames);
  });

  test('Ordenar produtos por Nome (Z a A)', async ({ page }) => {
    await sortInventory(page, 'za'); 
    const productNames = await getProductNames(page);
    
    const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));
    expect(productNames).toEqual(sortedNames);
  });

  test('Ordenar produtos por Preço (Baixo para Alto)', async ({ page }) => {
    await sortInventory(page, 'lohi'); 
    const productPrices = await getProductPrices(page);
    
    const sortedPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(sortedPrices);
  });

  test('Ordenar produtos por Preço (Alto para Baixo)', async ({ page }) => {
    await sortInventory(page, 'hilo'); 
    const productPrices = await getProductPrices(page);
    
    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sortedPrices);
  });
});
