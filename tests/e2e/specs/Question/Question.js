
describe('Question', () => {
  it('http://localhost:8080', () => {
    cy.visit('/Question.html');
    cy.get('div.img-item:nth-child(1)').click();
    cy.get('.animation > div:nth-child(2) > div:nth-child(1) > button:nth-child(4)').click();
    cy.get('.animation > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)').click();
    cy.get('.animation > div:nth-child(2) > div:nth-child(1) > button:nth-child(2)').click();
    cy.get('#input-132').type('25').type('{enter}');
    cy.get('#input-143').type('50').type('{enter}');
    cy.get('#input-154').type('65').type('{enter}');
    cy.get('#now-question > div > div > div.choose > div > button:nth-child(2)').click();
    cy.get('#input-171').type('300').type('{enter}');
    cy.get('.animation > div:nth-child(2) > div:nth-child(1) > button:nth-child(2)').click();
    cy.wait(3000);
    cy.get('#now-question > div > div > div.choose > div > button:nth-child(4)').click();
    cy.get('#now-question > div > div > div.choose > div > button:nth-child(4)').click();
    cy.get('#now-question > div > div > div.choose > div > button:nth-child(4)').click();
    cy.get('#now-question > div > div > div.choose > div > button:nth-child(4)').click();
    cy.get('#now-question > div > div > div.choose > div > button:nth-child(5)').click();
    cy.get('#now-question > div > div > div.choose > div > button:nth-child(4)').click();
    cy.get('#now-question > div > div > div.choose > div > button:nth-child(4)').click();
  });
});
