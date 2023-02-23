import HomePage from '../pageObjects/homePage.js';
import ComputerAndNotebooksPage from '../pageObjects/computerAndNotebooksPage.js';
import NotebooksPage from '../pageObjects/notebooksPage.js';
import MonitorsPage from '../pageObjects/monitorsPage.js';
import CartForm from '../pageObjects/cartForm.js';

describe ("QA Automation test task: test-case 2", () => {
  const homePage = new HomePage();
  const computerAndNotebooksPage = new ComputerAndNotebooksPage();
  const notebooksPage = new NotebooksPage();
  const monitorsPage = new MonitorsPage();
  const cartForm = new CartForm();
  let allTitles = new Array();
  let cartProductTitles = new Array();
  let totalPrice = 0;

  before(() =>{
    cy.visit('');
    cy.url().should('be.eq',Cypress.config('baseUrl'));
    cy.intercept('GET', 'https://catalog-api.rozetka.com.ua/v0.1/api/category/seo?*').as('getProducts');
  })

  it("Add items to the basket and verify 'Delete' button", () => {

    homePage.getNotebooksFromProductsCatalog().click();
    cy.wait("@getProducts");
    computerAndNotebooksPage.getNotebooksCard().click();
    cy.intercept('GET', 'https://common-api.rozetka.com.ua/v1/api/banners/get-header-banners*').as('getBanners');
    cy.wait("@getBanners");
    notebooksPage.getListOfSuggestedProducts().find('li').first().then(product => {

      cy.wrap(product).find('.goods-tile__price-value').then((price) =>{   
        totalPrice = totalPrice + parseInt(price.text().replace(/\u00a0/g, "").replace('₴', ""));
      })
      cy.wrap(product).find('.goods-tile__title').then((title) =>{   
        allTitles[0] = title.text().slice(1, -1);
      })
      cy.wrap(product).find('.buy-button').click().should('attr','aria-label', 'В кошику');
    })
    
    cy.go('back');
    cy.get("@getBanners").wait("@getBanners");
    computerAndNotebooksPage.getMonitorsCard().click();
    cy.get("@getBanners").wait("@getBanners");
    cy.get("@getBanners").wait("@getBanners");
    monitorsPage.getListOfSuggestedProducts().find('li').first().then(product => {

      cy.wrap(product).find('.goods-tile__price-value').then((price) =>{   
        totalPrice = totalPrice + parseInt(price.text().replace(/\u00a0/g, "").replace('₴', ""));
      })
      cy.wrap(product).find('.goods-tile__title').then((title) =>{   
        allTitles[1] = title.text().slice(1, -1);
      })
      cy.wrap(product).find('.buy-button').click().should('attr','aria-label', 'В кошику');
    })
    cartForm.getCartButton().click();
    cy.intercept('GET', 'https://common-api.rozetka.com.ua/v2/goods/get-cart-blocks?*').as('getCart');
    cy.wait("@getCart")
   
    cartForm.getCartProducts().should('be.visible').and('have.length', 2);
    cartForm.getProductTitle().each(($el, index, $list) => {     
      const productTitle = $el.text();
      cartProductTitles[index] = productTitle;
    
    }).then( () => {  
      const stringifiedCardProductTitles = cartProductTitles.sort().toString();
      allTitles = allTitles.sort().toString();

      expect(stringifiedCardProductTitles).to.deep.eq(allTitles);
    });
    cartForm.getCartTotalCost().then(cartTotalPrice => {
      cartTotalPrice = parseInt(cartTotalPrice.text().replace(/\u00a0/g, "").replace('₴', ""));
      expect(cartTotalPrice).to.deep.eq(totalPrice);
    });
  });
});