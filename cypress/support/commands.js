Cypress.Commands.add('visibleText', (text) => {
	cy.contains(text).should('be.visible');
});

Cypress.Commands.add('visible', () => {
	cy.fixture('selector').then(sel => {
		cy.get(sel.film_name_1).should('be.visible');
		cy.get(sel.film_name_2).should('be.visible');
		cy.get(sel.film_name_3).should('be.visible');
	})
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

Cypress.Commands.add('authorization', (fixture, text) => {
	cy.fixture(fixture).then(data => {
		cy.open('https://qamid.tmweb.ru/admin/', 'Администраторррская');
			const email = data.email;
			const password = data.password;
			cy.fixture('selector').then(sel => {
				cy.get(sel.login).type(email);
				cy.get(sel.pass).type(password);
				cy.get(sel.button).click();
				cy.visibleText(text);
		})
	})
});

Cypress.Commands.add('cycle', (fixture, text) => {
	cy.fixture(fixture).its('data').then(data => {
		data.forEach((data) => {
			cy.open('https://qamid.tmweb.ru/admin/', 'Администраторррская');
			const email = data.email;
			const password = data.password;
			cy.fixture('selector').then(sel => {
				if (password != null && email == null) {
					cy.get(sel.pass).type(password);
					cy.get(sel.button).click();
					cy.get(sel.login).then((elements) => {
						expect(elements[0].checkValidity()).to.be.false
						expect(elements[0].validationMessage).to.be.eql(text);
					});
				} else if (email != null && password == null) {
					cy.get(sel.login).type(email);
					cy.get(sel.button).click();
					cy.get(sel.pass).then((elements) => {
						expect(elements[0].checkValidity()).to.be.false
						expect(elements[0].validationMessage).to.be.eql(text);
					});
				} else if (email != null && password != null) {
					cy.get(sel.login).type(email);
					cy.get(sel.pass).type(password);
					cy.get(sel.button).click();
					cy.visibleText(text);
				} else {
					cy.get(sel.button).click();
					cy.get(sel.login).then((elements) => {
						expect(elements[0].checkValidity()).to.be.false
						expect(elements[0].validationMessage).to.be.eql(text);
					});
				}
			})
		})
	})
})