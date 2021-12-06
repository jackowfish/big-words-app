// Testing suite for UI Navigation

describe('User Navigation', () => {
    beforeEach(() => {
        
    });

    it('Integration Tests', () => {
        cy.viewport(500,843)
        // cy.visit('http://bigwords-202f6.web.app');
        cy.visit('http://localhost:3000/');
        // Click login button, login to site
        cy.get('button.green.button').click();
        // Type username and password
        cy.get('input.input.email').type('jackdeckere@gmail.com');
        cy.get('input.input.password').type('j990805D!');
        // Click login button
        cy.get('button.green.button').click();
        // Test My Words Page
        cy.get('a#MyWordsLink').click();
        cy.get('h1.listener_name').contains('Words');
        // Sort Big Words
        cy.get('#z_a_button_big').click();
        cy.get('#most_button_big').click();
        cy.get('#least_button_big').click();
        cy.get('#a_z_button_big').click();
        // Sort words
        cy.get('#z_a_button').click();
        cy.get('#most_button').click();
        cy.get('#least_button').click();
        cy.get('#a_z_button').click();
        // Test My Library Page
        cy.get('a#MyLibraryLink').click();
        cy.get('h1.libraryHeader').contains('My Library');
        // Test Search Page
        // TODO: Change this when search is implemented
        cy.get('a#SearchLink').click();
        cy.get('.featuredHeader').contains('All Books');
        // Test Add Book Page
        cy.get('a#AdminLink').click();
        cy.get('p.PageTitle').contains('Upload new book data!');
        // Test My Account Page
        cy.get('a#MyAccountLink').click();
        cy.get('button.green.button').contains('Log Out');
        // Test Home Page
        cy.get('a#HomepageLink').click()
        cy.get('button.yellow.button').contains('Log Books');
        // Click Account
        cy.get('#MyAccountLink').click();
        // Add Reader
        cy.get(':nth-child(3) > tr > :nth-child(3) > .App > button').click();
        cy.get(':nth-child(1) > .control > .input').type('Harold');
        cy.get(':nth-child(2) > .control > .input').type('Ford');
        cy.get('.is-success').click();
        // Remove Reader
        cy.get(':nth-child(4) > :nth-child(2) > :nth-child(3)').click();
        cy.get('.App > .button').click();
        cy.get('.is-success').click();
        // Add Listener
        // cy.get(':nth-child(5) > tr > :nth-child(3) > .App > button')
        // cy.get(':nth-child(1) > .control > .input').type('Henry');
        // cy.get(':nth-child(2) > .control > .input').type('Ford');
        // cy.get('.is-success').click();
        // Go to Search
        cy.get('.topnav > :nth-child(4)').click();
        // Log Book
        cy.get(':nth-child(2) > .bookpv > a > .row > .columns').click();
        cy.get('.yellow').click();
        cy.get(':nth-child(4) > .modal-card-body > :nth-child(1) > div').click();
        cy.get(':nth-child(5) > .modal-card-body > :nth-child(1) > div').click();
        cy.get('.is-success').click();
        cy.get('.red').click();
    });
})