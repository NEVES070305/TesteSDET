module.exports = {
  usernameInput: '#user-name.input_error.form_input',
  passwordInput: '#password.input_error.form_input',
  loginButton: '#login-button.submit-button.btn_action',
  homePageTitle: 'Swag Labs',
  errorMessage:  'h3[data-test="error"]',

  //Seletores de ordenação
  inventoryList: '.inventory_list',
  inventoryItem: '.inventory_item',
  inventoryItemName: '.inventory_item_name',
  sortDropdown: 'select[data-test="product-sort-container"]',
  productName: '.inventory_item_name',
  productPrice: '.inventory_item_price',

  //Seletor de adição
  buttonAdd: 'button[data-test^="add-to-cart-"]',
  cartLink: '.shopping_cart_link',
  cartBadge: '.shopping_cart_badge',
  checkoutButton: '[data-test="checkout"]',

  //Cart
  cartItemsSelected: '.cart_item .inventory_item_name',

  // Seletores do Checkout Step One
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',

  // Seletores do Checkout Step Two
  summarySubtotalLabel: '.summary_subtotal_label',
  summaryTaxLabel: '.summary_tax_label',
  summaryTotalLabel: '.summary_total_label',
  
  // Seletores para finalizar a compra
  finishButton: '[data-test="finish"]',
  completeHeader: '.complete-header',  
  
  errorMessage: '.error-message-container',

  // Seletor para o botão Cancel 
  cancelButton: '[data-test="cancel"]',

  // Seletores da página de detalhes do produto
  productDetailName: '.inventory_details_name',
  productDetailPrice: '.inventory_details_price',
  backToProductsButton: '[data-test="back-to-products"]',
  productDetailImage: '.inventory_details_img',
};