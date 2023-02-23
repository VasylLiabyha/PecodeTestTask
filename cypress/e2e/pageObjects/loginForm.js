export default class LoginForm {

  getMyProfileBtn () {
    return cy.xpath("//li[@class='header-actions__item header-actions__item--user']");
  }

  getLoginForm () {
    return cy.xpath("//div[@class='modal__content']/..");
  }

  getEmailInput () {
    return cy.xpath("//input[@type='email']");
  }

  getPasswordInput () {
    return cy.xpath("//input[@type='password']");
  }

  getLoginBtn () {
    return cy.xpath("//button[contains(text(),'Увійти')]")
  }
}