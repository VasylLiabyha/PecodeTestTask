export default class ComputerAndNotebooksPage {

  getNotebooksCard () {
    return cy.xpath('//a[@title="Ноутбуки"]/..');
  }
  getMonitorsCard () {
    return cy.xpath('//a[@title="Монітори"]/..');
  }

}