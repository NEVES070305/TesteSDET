const { test } = require('@playwright/test');
const { navigateToLoginPage } = require('../../actions/navigation/navigationAction');
const { login, verifyLoginSuccess } = require('../../actions/login/loginAction');
const { goToCheckoutStepOne } = require('../../actions/navigation/checkoutNavigationAction');
const { checkoutStepOne } = require('../../actions/checkout/checkoutAction');
const { cancelCheckoutStepTwo, cancelCheckoutStepOne } = require('../../actions/navigation/backNavigationAction');
const selectors = require('../../utils/selectors');
const users = require('../../utils/users');

test.describe('Back Navigation no Fluxo de Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const validUser = users.find(u => u.valid);
    if (!validUser) throw new Error('Nenhum usuário válido disponível.');
    
    // Login e navegação até a página de inventário
    await navigateToLoginPage(page);
    await login(page, validUser.username, validUser.password);
    await verifyLoginSuccess(page, selectors.homePageTitle);
  });

  test('Cancel em Checkout Step Two retorna para Checkout Step One', async ({ page }) => {
    // Navega para Checkout Step One e preenche o formulário para ir para Step Two
    await goToCheckoutStepOne(page);
    await checkoutStepOne(page, 'John', 'Doe', '12345');
    
    // Agora estamos na tela de Checkout Step Two. Clicamos em Cancel para voltar para Checkout Step One.
    await cancelCheckoutStepTwo(page);
  });

  test('Cancel em Checkout Step One retorna para o Carrinho', async ({ page }) => {
    // Navega para Checkout Step One diretamente (a partir do carrinho)
    await goToCheckoutStepOne(page);
    
    // Em vez de preencher o formulário, clicamos em Cancel para voltar para o carrinho.
    await cancelCheckoutStepOne(page);
  });
});
