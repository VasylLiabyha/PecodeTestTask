export default class CartForm {

  getCartButton () {
    return cy.xpath("//rz-cart/button");
  }

  getCartProducts () {
    return cy.xpath("//rz-cart-product");
  }

  getProductTitle () {
    return cy.xpath("//a[@data-testid='title']");
  }

  getProductCost () {
    return cy.xpath("//p[@data-testid='cost']");
  }

  getCartTotalCost () {
    return cy.xpath("//div[@class='cart-receipt__sum-price']");
  }

  unfoldDeleteBtn () {
    return cy.xpath("//button[@id='cartProductActions0']").click()
  }

  getDeleteBtn () {
    return cy.xpath("//button[contains(text(),'Видалити')]")
  }
}