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
    cy.get("#username").type('asdasdsadas')
    cy.get('#password').type('asdasdsadas')
    cy.get('button[type="submit"]').click();
    cy.window()
    .its("sessionStorage")
    .invoke("getItem", "username")
    .should("not.exist");
  })
})