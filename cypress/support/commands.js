Cypress.Commands.add('visibleText', (text) => {
	cy.contains(text).should('be.visible');
});

Cypress.Commands.add('clickElement', (selector) => {
	cy.get(selector).click();
});

Cypress.Commands.add('visibleTitle', () => {
	cy.fixture('selector').then(sel => {
		cy.get(sel.header).should('be.visible');
	})
});

Cypress.Commands.add('open', (link, text) => {
	cy.visit(link);
	cy.contains(text).should('be.visible');
});

Cypress.Commands.add('login', (email, password) => {
		cy.open('https://qamid.tmweb.ru/admin/', 'Администраторррская');
			cy.fixture('selector').then(sel => {
				if(email)
				cy.get(sel.login).type(email);
				if(password)
				cy.get(sel.pass).type(password);
				cy.get(sel.button).click();
		})
})