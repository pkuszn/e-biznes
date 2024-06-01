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

  it('register user - validation (missing password)', () => {
    let name = faker.internet.userName();
    let surname = faker.internet.domainName();
    let email = faker.internet.email();
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

  it('register user - validation (missing name)', () => {
    let password = faker.internet.password();
    let surname = faker.internet.domainName();
    let email = faker.internet.email();
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get('.register-button').click();
    cy.get("#password").type(password)
    cy.get('#surname').type(surname)
    cy.get("#address").type(email)
    cy.get('button[type="submit"]').click()
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith("All fields are required")      
    })  
  })

  
  it('register user - validation (missing surname)', () => {
    let password = faker.internet.password();
    let name = faker.internet.userName();
    let email = faker.internet.email();
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get('.register-button').click();
    cy.get("#password").type(password)
    cy.get('#name').type(name)
    cy.get("#address").type(email)
    cy.get('button[type="submit"]').click()
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith("All fields are required")      
    })  
  })

  it('register user - validation (missing address)', () => {
    let password = faker.internet.password();
    let name = faker.internet.userName();
    let surname = faker.internet.domainName();
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get('.register-button').click();
    cy.get("#password").type(password)
    cy.get('#name').type(name)
    cy.get("#surname").type(surname)
    cy.get('button[type="submit"]').click()
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith("All fields are required")      
    })  
  })


  it('logout', () => {
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
    cy.get('ul > :nth-child(5) > p > b').click()
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "username")
      .should("not.exist");
  })

  it('login label', () => {
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
    cy.get('ul > :nth-child(7)').should("have.text", "Logged as: root")
  })
})