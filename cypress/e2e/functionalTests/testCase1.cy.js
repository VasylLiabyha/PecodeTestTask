import HomePage from '../pageObjects/homePage.js'
import ComputerAndNotebooksPage from '../pageObjects/computerAndNotebooksPage.js'
import NotebooksPage from '../pageObjects/notebooksPage.js'

describe ("QA Automation test task: test-case 1", () => {

  const homePage = new HomePage();
  const computerAndNotebooksPage = new ComputerAndNotebooksPage();
  const notebooksPage = new NotebooksPage();
  const minPrice = 10_000;
  const maxPrice = 35_000;
  let prices = new Array();

  beforeEach('', () =>{
    cy.visit('');
    cy.url().should('be.eq',Cypress.config('baseUrl'));
    cy.intercept('GET', 'https://catalog-api.rozetka.com.ua/v0.1/api/category/seo?*').as('getProducts');
    
  })

  it("Verify the price filter", () => {
    
    homePage.getNotebooksFromProductsCatalog().click();
    cy.wait("@getProducts");
    computerAndNotebooksPage.getNotebooksCard().click();
    cy.intercept('GET', 'https://common-api.rozetka.com.ua/v1/api/banners/get-header-banners*').as('getBanners');
    cy.wait("@getBanners");
    notebooksPage.getMinPriceInput().clear().type(minPrice).should('have.value', minPrice);
    notebooksPage.getMaxPriceInput().clear().type(maxPrice).should('have.value', maxPrice);
    notebooksPage.getSubmitPriceFilterBtn().click();
    cy.wait("@getProducts");
    notebooksPage.getSortingBtn().select('1: cheap');
    notebooksPage.getListOfSuggestedProducts().find('.goods-tile__price-value').each(($el, index, $list) => {

      prices[index] = $el.text().replace(/\u00a0/g, "").replace('₴', "");

    }).then(() => {
      
      const stringifiedSortedPrices = prices.sort().toString();
      const stringifiedPrices = prices.toString();
      const lowestPriceOfProduct = parseInt(prices[0]);
      const highestPriceOfProduct = parseInt(prices[prices.length-1]);

      expect(stringifiedPrices).to.deep.eq(stringifiedSortedPrices);
      expect(lowestPriceOfProduct >= minPrice).to.be.true;
      expect(highestPriceOfProduct <= maxPrice).to.be.true;
    });
  });

});