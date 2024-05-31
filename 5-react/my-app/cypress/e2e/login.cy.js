import { faker } from '@faker-js/faker';

describe('login', () => {
  it('valid login', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "username")
      .should("exist");
  })

  it('invalid login', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('test123')
    cy.get('#password').type('test123')
    cy.get('button[type="submit"]').click();
    cy.window()
    .its("sessionStorage")
    .invoke("getItem", "username")
    .should("not.exist");
  })

  it('register user', () => {
    let name = faker.internet.userName();
    let surname = faker.internet.domainName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get('.register-button').click();
    cy.get("#name").type(name)
    cy.get('#surname').type(surname)
    cy.get("#address").type(email)
    cy.get('#password').type(password)
    cy.get('button[type="submit"]').click();
    cy.window()
    .its("sessionStorage")
    .invoke("getItem", "username")
    .should("exist");
  })

  it('register user - validation', () => {
    let name = faker.internet.userName();
    let surname = faker.internet.domainName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get('.register-button').click();
    cy.get("#name").type(name)
    cy.get('#surname').type(surname)
    cy.get("#address").type(email)
    cy.get('button[type="submit"]').click()
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith("All fields are required")      
    })  
  })
})