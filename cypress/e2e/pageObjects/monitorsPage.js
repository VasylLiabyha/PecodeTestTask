export default class MonitorsPage {

  getMinPriceInput () {
    return cy.xpath("//input[@formcontrolname='min']");
  }
  getMaxPriceInput () {
    return cy.xpath("//input[@formcontrolname='max']");
  }

  getSortingBtn () {
    return cy.xpath("//rz-sort/select");
  }
  getSubmitPriceFilterBtn () {
    return cy.xpath("//button[@type='submit']");
  }
  getListOfSuggestedProducts () {
    return cy.xpath('//ul[@class="catalog-grid ng-star-inserted"]');
  }

}