describe('login', () => {
  it('valid login', () => {
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('#login').click()
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "username")
      .should("exist");
  })

  it('invalid login', () => {
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root1')
    cy.get('#login').click()
    cy.window()
    .its("sessionStorage")
    .invoke("getItem", "username")
    .should("not.exist");
  })
})