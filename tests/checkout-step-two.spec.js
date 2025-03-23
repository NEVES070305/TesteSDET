const { test } = require('@playwright/test');
const { navigateToLoginPage } = require('../actions/navigationAction');
const { login, verifyLoginSuccess } = require('../actions/loginAction');
const { addDistinctRandomItemsToCart } = require('../actions/inventoryAction');
const { goToCheckoutStepOne } = require('../actions/checkoutNavigationAction');
const { checkoutStepOne } = require('../actions/checkoutAction');
const { verifyProductsInCart } = require('../actions/cartAction');
const { verifyCheckoutPrices } = require('../actions/checkoutPriceVerificationAction');
const selectors = require('../utils/selectors');
const users = require('../utils/users');

test('Checkout Step Two - Verificação de Itens e Preços', async ({ page }) => {
  // Seleciona um usuário válido e faz login
  const validUser = users.find(u => u.valid);
  if (!validUser) throw new Error('Nenhum usuário válido disponível.');
  await navigateToLoginPage(page);
  await login(page, validUser.username, validUser.password);
  await verifyLoginSuccess(page, selectors.homePageTitle);

  // Adiciona 2 itens aleatórios ao carrinho
  await addDistinctRandomItemsToCart(page);
  
  // Navega para o Checkout: do carrinho para o Checkout Step One
  await goToCheckoutStepOne(page);
  
  // Preenche o formulário do Checkout Step One e avança para o Step Two
  await checkoutStepOne(page, 'John', 'Doe', '12345');

  // Na tela de Checkout Step Two, extrai os itens exibidos
  const expectedItems = await page.$$eval('.cart_item', els => {
    return els.map(el => {
      const name = el.querySelector('.inventory_item_name')?.textContent.trim() || '';
      const priceText = el.querySelector('.inventory_item_price')?.textContent.trim() || '$0.00';
      const price = parseFloat(priceText.replace('$', ''));
      return { name, price };
    });
  });

  // Verifica se os itens exibidos correspondem aos esperados
  await verifyProductsInCart(page, '.cart_item .inventory_item_name', expectedItems);

  // Calcula o subtotal esperado com base nos preços dos itens
  const expectedSubtotal = expectedItems.reduce((sum, item) => sum + item.price, 0);

  // Verifica os valores de subtotal, taxa e total na tela de Checkout Step Two
  await verifyCheckoutPrices(page, expectedSubtotal, 0.08);
});
