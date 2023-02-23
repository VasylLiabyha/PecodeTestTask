import HomePage from '../pageObjects/homePage.js'

describe ("QA Automation test task: test-case 3", () => {
  const homePage = new HomePage();
  const productName = 'iPhone';

  before(() =>{
    cy.visit('');
    cy.url().should('be.eq',Cypress.config('baseUrl'));
  })

  it("Search the item and verify returned products", () => {

    homePage.getSearchBar().type(productName);
    homePage.getSearchBtn().click();
    homePage.getListOfSuggestedProducts().find('.goods-tile__heading').each(($el, index, $list) => {

      const productTitle = $el.text();
      expect(productTitle).contains(productName);

    })
  });

});