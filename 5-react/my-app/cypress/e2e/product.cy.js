import { faker } from '@faker-js/faker';

describe('product', () => {
  it('select `black teas` category', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-list > :nth-child(1)').click()
    cy.get('.product-details').each(($el, index, $list) => {
      const nthChild = $el.find(':nth-child(3)');
      cy.wrap(nthChild).invoke('text').then((text) => {
        cy.log(`Product ${index + 1}: ${text}`);
        expect(text).to.include('Black teas');
      });
    });
  })

  it('select `green teas` category', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-list > :nth-child(2)').click()
    cy.get('.product-details').each(($el, index, $list) => {
      const nthChild = $el.find(':nth-child(3)');
      cy.wrap(nthChild).invoke('text').then((text) => {
        cy.log(`Product ${index + 1}: ${text}`);
        expect(text).to.include('Green teas');
      });
    });
  })

  it('select `white teas` category', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-list > :nth-child(3)').click()
    cy.get('.product-details').each(($el, index, $list) => {
      const nthChild = $el.find(':nth-child(3)');
      cy.wrap(nthChild).invoke('text').then((text) => {
        cy.log(`Product ${index + 1}: ${text}`);
        expect(text).to.include('White teas');
      });
    });
  })

  it('select `oolong teas` category', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-list > :nth-child(4)').click()
    cy.get('.product-details').each(($el, index, $list) => {
      const nthChild = $el.find(':nth-child(3)');
      cy.wrap(nthChild).invoke('text').then((text) => {
        cy.log(`Product ${index + 1}: ${text}`);
        expect(text).to.include('Oolong teas');
      });
    });
  })

  it('select `fruit teas` category', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-list > :nth-child(5)').click()
    cy.get('.product-details').each(($el, index, $list) => {
      const nthChild = $el.find(':nth-child(3)');
      cy.wrap(nthChild).invoke('text').then((text) => {
        cy.log(`Product ${index + 1}: ${text}`);
        expect(text).to.include('Fruit teas');
      });
    });
  })

  it('select `tea accessories` category', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-list > :nth-child(6)').click()
    cy.get('.product-details').each(($el, index, $list) => {
      const nthChild = $el.find(':nth-child(3)');
      cy.wrap(nthChild).invoke('text').then((text) => {
        cy.log(`Product ${index + 1}: ${text}`);
        expect(text).to.include('Tea accessories');
      });
    });
  })

  it('add product to basket', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get('.cart-item > :nth-child(1)').should('have.text', 'Earl Grey');
  })

  it('remove product from basket', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get('.cart-item > :nth-child(5)').click()
    cy.get('.cart-container > :nth-child(3)').should('have.text', 'Your cart is empty.')
  })

  it('clear cart', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get('.clear-cart-button').click()
    cy.get('.cart-container > :nth-child(3)').should('have.text', 'Your cart is empty.')
  })

  it('buy product without account - invalid operation', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get('.cart-submit > :nth-child(2)').click()
    const stub = cy.stub()
    cy.on('window:alert', stub)
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("You need an account to buy a product.")
      })
  })

  it('basket selected details 1 - user details', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(2) > p > b').should("have.text", "root")
    cy.get(':nth-child(2) > p > b').should("have.text", "root")
  })

  it('basket selected details 2 - cash on delivery', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(2) > #selectOptions').select('Cash on delivery');
    cy.get('.cart-details > :nth-child(1) > :nth-child(5) > p > b').should("have.text", "Cash on delivery")
  })

  it('basket selected details 3 - delivery type', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(3) > #selectOptions').select('Courier');
    cy.get(':nth-child(6) > p > b').should("have.text", "Courier")
  })


  it('basket selected details 4 - payment method', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(4) > #selectOptions').select('Credit Card');
    cy.get(':nth-child(7) > p > b').should("have.text", "Credit Card")
  })

  it('basket selected details 5 - price', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(8) > p > b').should("have.text", "13.98")
  })

  it('basket selected details 6 - fill form', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(2) > #selectOptions').select('Cash on delivery');
    cy.get(':nth-child(3) > #selectOptions').select('Courier');
    cy.get(':nth-child(4) > #selectOptions').select('Credit Card');
    cy.get('.cart-details > :nth-child(1) > :nth-child(5) > p > b').should("have.text", "Cash on delivery")
    cy.get(':nth-child(6) > p > b').should("have.text", "Courier")
    cy.get(':nth-child(7) > p > b').should("have.text", "Credit Card")
    cy.get(':nth-child(8) > p > b').should("have.text", "13.98")
  })

  it('basket selected details 7 - post', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(3) > #selectOptions').select('Post');
    cy.get(':nth-child(6) > p > b').should("have.text", "Post")
  })

  it('basket selected details 8 - pay in advance', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(2) > #selectOptions').select('Pay in advance');
    cy.get('.cart-details > :nth-child(1) > :nth-child(5) > p > b').should("have.text", "Pay in advance")
  })

  it('basket selected details 9 - bank transfer', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(4) > #selectOptions').select('Bank Transfer');
    cy.get(':nth-child(7) > p > b').should("have.text", "Bank Transfer")
  })

  it('basket selected details 10 - blik', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(4) > #selectOptions').select('Blik');
    cy.get(':nth-child(7) > p > b').should("have.text", "Blik")
  })

  it('basket selected details 11 - paypal option', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(4) > #selectOptions').select('PayPal');
    cy.get(':nth-child(7) > p > b').should("have.text", "PayPal")
  })

  it('buy a product', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(2) > #selectOptions').select('Cash on delivery');
    cy.get(':nth-child(3) > #selectOptions').select('Courier');
    cy.get(':nth-child(4) > #selectOptions').select('Credit Card');
    cy.wait(2000);
    cy.get('.cart-submit > :nth-child(2)').click()
    const stub = cy.stub()
    cy.on('window:alert', stub)
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Products have been purchased.")
      })
  })

  it('buy a product - with pay now', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.wait(1000);
    cy.get(':nth-child(2) > #selectOptions').select('Cash on delivery');
    cy.get(':nth-child(3) > #selectOptions').select('Courier');
    cy.get(':nth-child(4) > #selectOptions').select('Credit Card');
    cy.get('#payNowCheckbox').click()
    cy.wait(2000);
    cy.get('.cart-submit > :nth-child(2)').click()
    const stub = cy.stub()
    cy.on('window:alert', stub)
      .then(() => {
        cy.wait(1000);
        expect(stub.getCall(0)).to.be.calledWith("Products have been purchased.")
      })

  })

  it('select 100 products', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-card-add-quantity > #product-quantity').clear()
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-card-add-quantity > #product-quantity').type(100);
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(8) > p > b').should("have.text", "599")
  })

  it('select 100 products of different kind', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-card-add-quantity > #product-quantity').clear()
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-card-add-quantity > #product-quantity').type(50);
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-card-add-quantity > #product-quantity').clear()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-card-add-quantity > #product-quantity').type(50);
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(8) > p > b').should("have.text", "699")
  })

  it('buy 100 products', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-card-add-quantity > #product-quantity').clear()
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-card-add-quantity > #product-quantity').type(50);
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-card-add-quantity > #product-quantity').clear()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-card-add-quantity > #product-quantity').type(50);
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.wait(1000);
    cy.get(':nth-child(2) > #selectOptions').select('Cash on delivery');
    cy.get(':nth-child(3) > #selectOptions').select('Courier');
    cy.get(':nth-child(4) > #selectOptions').select('Credit Card');
    cy.get('#payNowCheckbox').click()
    cy.wait(2000);
    cy.get('.cart-submit > :nth-child(2)').click()
    const stub = cy.stub()
    cy.on('window:alert', stub)
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Products have been purchased.")
      })
  })

  it('buy all products', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(4) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(5) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(6) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(7) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(8) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(9) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(10) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(11) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(12) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(13) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(14) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(15) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(16) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(17) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(18) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(19) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(20) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(21) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(22) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(23) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(24) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(25) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(26) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(27) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(28) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(29) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(30) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.wait(1000);
    cy.get(':nth-child(2) > #selectOptions').select('Cash on delivery');
    cy.get(':nth-child(3) > #selectOptions').select('Courier');
    cy.get(':nth-child(4) > #selectOptions').select('Credit Card');
    cy.get('#payNowCheckbox').click()
    cy.wait(2000);
    cy.get('.cart-submit > :nth-child(2)').click()
    const stub = cy.stub()
    cy.on('window:alert', stub)
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Products have been purchased.")
      })
  })

  it('verify basket content label', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(3) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(4) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(5) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(6) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(7) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(8) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(9) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(10) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(11) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(12) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(13) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(14) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(15) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(16) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(17) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(18) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(19) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(20) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(21) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(22) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(23) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(24) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(25) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(26) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(27) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(28) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(29) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(30) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get('ul > :nth-child(6)').should("have.text", "Basket content: 30")
  })

  it('add products and delete one', () => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('a[href*="/login"]').click({ force: true });
    cy.get("#username").type('root')
    cy.get('#password').type('root')
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > a').click();
    cy.wait(1000);
    cy.get(':nth-child(1) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.wait(1000);
    cy.get(':nth-child(2) > .product-card > .product-card-footer > .product-card-add > .product-button').click()
    cy.get(':nth-child(3) > a').click()
    cy.wait(1000);
    cy.get('tbody > :nth-child(2) > :nth-child(5)').click();
    cy.wait(1000);
    cy.get('.cart-table-container')
      .find('tr') 
      .should('have.length', 1);
  })
})