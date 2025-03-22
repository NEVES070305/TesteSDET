// tests/login.spec.js
const { chromium, test, beforeAll } = require("@playwright/test");
const { navigateToLoginPage } = require("../actions/navigationAction");
const { login, verifyLoginSuccess, verifyLoginFailure } = require("../actions/loginAction");
const selectors = require("../utils/selectors");
const users = require("../utils/users");

users.forEach((user) => {
  if (user.valid) {
    test(`Login com o usuário válido: ${user.username} , esperando ser logado`, async ({ page }) => {
      await navigateToLoginPage(page);
      await login(page, user.username, user.password);
      await verifyLoginSuccess(page, selectors.homePageTitle);    
    })
  }
  else 
  {
    test(`Login com o usuário inválido: ${user.username} , esperando não ser logado`, async ({ page }) => {
      await navigateToLoginPage(page);
      await login(page, user.username, user.password);
      // Espera aparecer a mensagem de erro
      await verifyLoginFailure(page, selectors.errorMessage);
    })
  }
});