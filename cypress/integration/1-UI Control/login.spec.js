// Testing suite for BigWords App

// Random interval for tests
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

describe('Login & Signup', () => {
    beforeEach(() => {
        cy.viewport(500,843)
        // cy.visit('http://bigwords-202f6.web.app')
        cy.visit('http://localhost:3000/')
    })

    it('User can login', () => {
        // Click login button, login to site
        cy.get('button.green.button').click();
        // Type username and password
        cy.get('input.input.email').type('jackdeckere@gmail.com');
        cy.get('input.input.password').type('j990805D!');
        // Click login button
        cy.get('button.green.button').click();
    });

    it('User can signup', () => {
        const randomNumber = randomIntFromInterval(1,10000);
         // Click signup button
         cy.get('button.yellow.button').click();
         // Type user information
         cy.get('input.input.caregiverFirst').type(`TestAdult${randomNumber}`);
         cy.get('input.input.caregiverLast').type(`LastName${randomNumber}!`);
         cy.get('input.input.email').type(`email${randomNumber}@gmail.com`);
         cy.get('input.input.password').type(`testPassword${randomNumber}!`);
         cy.get('input.input.passwordConfirm').type(`testPassword${randomNumber}!`);
         // Click signup button
         cy.get('button.yellow.button').click()
    });

    it('User can logout', () => {
        // Click login button, login to site
        cy.get('button.green.button').click();
        // Type username and password
        cy.get('input.input.email').type('jackdeckere@gmail.com');
        cy.get('input.input.password').type('j990805D!');
        // Click login button
        cy.get('button.green.button').click();
        // Go to account page
        cy.get('a#MyAccountLink').click();
        // Click logout
        cy.get('button.green.button').click();
        // Verify login page
        cy.get('button.green.button').contains('Login');
    });
})