describe('payment', () => {
    it('buy a product with unchecked pay now option', () => {
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
        cy.get(':nth-child(4) > #selectOptions').select('PayPal');
        cy.wait(1000);
        cy.get('.cart-submit > :nth-child(2)').click()
        cy.wait(1000);
        const stub = cy.stub()
        cy.on('window:alert', stub)
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith("Products have been purchased.")
            })
        cy.wait(1000);
        cy.get(':nth-child(4) > a').click()
        cy.get('.payment-table-container')
            .find('tr')
            .last()
            .find('td:nth-child(3)')
            .then(($lastColumn) => {
                cy.wrap($lastColumn).should('have.text', 'PayPal');
            });
    })

    it('buy a product with unchecked pay now option - should be pending', () => {
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
        cy.get(':nth-child(4) > #selectOptions').select('PayPal');
        cy.wait(1000);
        cy.get('.cart-submit > :nth-child(2)').click()
        cy.wait(1000);
        const stub = cy.stub()
        cy.on('window:alert', stub)
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith("Products have been purchased.")
            })
        cy.wait(1000);
        cy.get(':nth-child(4) > a').click()
        cy.get('.payment-table-container')
            .find('tr')
            .last()
            .find('td:nth-child(6)')
            .then(($lastColumn) => {
                cy.wrap($lastColumn).should('have.text', 'Pending');
            });
    })

    it('buy a product with checked pay now option - should be completed', () => {
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
        cy.get(':nth-child(4) > #selectOptions').select('PayPal');
        cy.wait(1000);
        cy.get('#payNowCheckbox').click()
        cy.get('.cart-submit > :nth-child(2)').click()
        cy.wait(1000);
        const stub = cy.stub()
        cy.on('window:alert', stub)
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith("Products have been purchased.")
            })
        cy.wait(1000);
        cy.get(':nth-child(4) > a').click()
        cy.get('.payment-table-container')
            .find('tr')
            .last()
            .find('td:nth-child(6)')
            .then(($lastColumn) => {
                cy.wrap($lastColumn).should('have.text', 'Completed');
            });
    })

    it('buy a product by credit card', () => {
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
        cy.wait(1000);
        cy.get('#payNowCheckbox').click()
        cy.get('.cart-submit > :nth-child(2)').click()
        cy.wait(1000);
        const stub = cy.stub()
        cy.on('window:alert', stub)
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith("Products have been purchased.")
            })
        cy.wait(1000);
        cy.get(':nth-child(4) > a').click()
        cy.get('.payment-table-container')
            .find('tr')
            .last()
            .find('td:nth-child(3)')
            .then(($lastColumn) => {
                cy.wrap($lastColumn).should('have.text', 'Credit Card');
            });
    })

    it('buy a product by blik', () => {
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
        cy.get(':nth-child(4) > #selectOptions').select('Blik');
        cy.wait(1000);
        cy.get('#payNowCheckbox').click()
        cy.get('.cart-submit > :nth-child(2)').click()
        cy.wait(1000);
        const stub = cy.stub()
        cy.on('window:alert', stub)
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith("Products have been purchased.")
            })
        cy.wait(1000);
        cy.get(':nth-child(4) > a').click()
        cy.get('.payment-table-container')
            .find('tr')
            .last()
            .find('td:nth-child(3)')
            .then(($lastColumn) => {
                cy.wrap($lastColumn).should('have.text', 'Blik');
            });
    })

    it('buy a product by bank transfer', () => {
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
        cy.get(':nth-child(4) > #selectOptions').select('Bank Transfer');
        cy.wait(1000);
        cy.get('#payNowCheckbox').click()
        cy.get('.cart-submit > :nth-child(2)').click()
        cy.wait(1000);
        const stub = cy.stub()
        cy.on('window:alert', stub)
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith("Products have been purchased.")
            })
        cy.wait(1000);
        cy.get(':nth-child(4) > a').click()
        cy.get('.payment-table-container')
            .find('tr')
            .last()
            .find('td:nth-child(3)')
            .then(($lastColumn) => {
                cy.wrap($lastColumn).should('have.text', 'Bank Transfer');
            });
    })

    it('buy 100 products - check price', () => {
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
        cy.get(':nth-child(4) > #selectOptions').select('Bank Transfer');
        cy.wait(1000);
        cy.get('#payNowCheckbox').click()
        cy.get('.cart-submit > :nth-child(2)').click()
        cy.wait(1000);
        const stub = cy.stub()
        cy.on('window:alert', stub)
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith("Products have been purchased.")
            })
        cy.wait(1000);
        cy.get(':nth-child(4) > a').click()
        cy.get('.payment-table-container')
            .find('tr')
            .last()
            .find('td:nth-child(4)')
            .then(($lastColumn) => {
                cy.wrap($lastColumn).should('have.text', '699');
            });
    })

    it('buy product and pay later', () => {
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
        cy.get(':nth-child(4) > #selectOptions').select('Bank Transfer');
        cy.wait(1000);
        cy.get('.cart-submit > :nth-child(2)').click()
        cy.wait(1000);
        cy.wait(1000);
        cy.get(':nth-child(4) > a').click()
        cy.get('.payment-table-container')
            .find('tr')
            .last()
            .find('td:nth-child(7)')
            .then(($lastColumn) => {
                cy.wrap($lastColumn).click()
                const stub = cy.stub()
                cy.on('window:alert', stub)
                    .then(() => {
                        expect(stub.getCall(0)).to.be.calledWith("Payment has been updated")
                    })
            });
    })

    it('payment button should be inactive if user is not logged in', () => {
        cy.clearCookies();
        cy.clearLocalStorage()
        cy.visit('http://localhost:3000')
        cy.get(':nth-child(4) > a').should("not.exist")
    })
})