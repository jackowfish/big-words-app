// Testing suite for UI Navigation

describe('User Navigation', () => {
    beforeEach(() => {
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
    });

    it('Navbar Tests', () => {
        // Test My Words Page
        cy.get('a#MyWordsLink').click();
        cy.get('h1.listener_name').contains('My Words');
        // Test My Library Page
        cy.get('a#MyLibraryLink').click();
        cy.get('h1.libraryHeader').contains('My Library');
        // Test Search Page
        // TODO: Change this when search is implemented
        cy.get('a#SearchLink').click();
        cy.get('.libraryHeader').contains('Featured');
        // Test Add Book Page
        cy.get('a#AdminLink').click();
        cy.get('p.PageTitle').contains('Upload new book data!');
        // Test My Account Page
        cy.get('a#MyAccountLink').click();
        cy.get('button.green.button').contains('Log Out');
        // Test Home Page
        cy.get('a#HomepageLink').click()
        cy.get('button.yellow.button').contains('Log Books');
    })
})