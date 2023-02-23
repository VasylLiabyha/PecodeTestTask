import HomePage from '../pageObjects/homePage.js'
import LoginForm from '../pageObjects/loginForm.js'
import { user } from '../pageObjects/utils.js'

describe ("QA Automation test task: test-case 4", () => {
  const homePage = new HomePage();
  const loginForm = new LoginForm();
  const productName = 'iPhone';

  before(() =>{
    cy.visit('');
    cy.url().should('be.eq',Cypress.config('baseUrl'));
  })

  it("Happy login and logout", () => {

    loginForm.getMyProfileBtn().click();
    loginForm.getLoginForm().should('be.visible');
    loginForm.getEmailInput().type(user.email).should('have.value', user.email);
    loginForm.getPasswordInput().type(user.password).should('have.value', user.password);
    loginForm.getLoginBtn().click();
    loginForm.getLoginForm().should('not.exist');
    loginForm.getMyProfileBtn().should('not.exist');
    homePage.openSideBar();
    homePage.logout();
    loginForm.getMyProfileBtn().should('be.visible');
  })
});