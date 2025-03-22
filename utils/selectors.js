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

  cartItemsSelected: '.cart_item .inventory_item_name'
};