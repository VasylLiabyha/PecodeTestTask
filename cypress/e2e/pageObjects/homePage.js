export default class HomePage {

  getProductsCatalog () {
    return cy.xpath("//ul[@class='menu-categories menu-categories_type_main']");
  }
  getNotebooksFromProductsCatalog () {
    return this.getProductsCatalog().contains('Ноутбуки та комп’ютери')
  }

  getSearchBar () {
    return cy.xpath('//input[@name="search"]');
  }

  getListOfSuggestedProducts () {
    return cy.xpath('//ul[@class="catalog-grid ng-star-inserted"]');
  }

  getSearchBtn () {
    return cy.xpath("//button[contains(text(),'Знайти')]");
  }

  openSideBar () {
    return cy.xpath("//button[@aria-label='Відкрити меню']").click();
  }

  logout () {
    return cy.xpath("//button[contains(text(),'Вийти з аккаунта')]").click();
  }
  
}