describe('test home page elements display visible', () => {
	beforeEach(() => {
		cy.open('/', 'Идём');
	});

	it('test home page display', () => {
		cy.visibleTitle();
	});

	it('test be visible name films', () => {
		cy.fixture('selector').then(sel => {
			cy.get(sel.film_name_1).should('be.visible');
			cy.get(sel.film_name_2).should('be.visible');
			cy.get(sel.film_name_3).should('be.visible');
		})
	});

	it('test be visible days of the week', () => {
		cy.visibleText('Пн');
		cy.visibleText('Вт');
		cy.visibleText('Ср');
		cy.visibleText('Чт');
		cy.visibleText('Пт');
		cy.visibleText('Сб');
		cy.visibleText('Вс');
	})
});

describe('test admin', () => {
	it('successful authorization as administrator', () => {
		cy.fixture('user_data').then(function (regdata) {
			this.regdata = regdata;
			cy.login(regdata.validEmail, regdata.validPassword);
			cy.visibleText('Управление залами');
		})
	})


	it('unsuccessful authorization as administrator with invalid email', () => {
		cy.fixture('user_data').then(function (regdata) {
			this.regdata = regdata;
			cy.login(regdata.invalidEmail, regdata.validPassword);
			cy.visibleText('Ошибка авторизации');
		})
	})

	it('unsuccessful authorization as administrator with invalid password', () => {
		cy.fixture('user_data').then(function (regdata) {
			this.regdata = regdata;
			cy.login(regdata.validEmail, regdata.invalidEmail);
			cy.visibleText('Ошибка авторизации');
		})
	})

	it('unsuccessful authorization as administrator with invalid password and email', () => {
		cy.fixture('user_data').then(function (regdata) {
			this.regdata = regdata;
			cy.login(regdata.invalidEmail, regdata.invalidPassword);
			cy.visibleText('Ошибка авторизации');
		})
	})

	it('unsuccessful authorization as administrator with empty field email', () => {
		cy.fixture('user_data').then(function (regdata) {
			this.regdata = regdata;
			cy.login(regdata.emptyFieldEmail, regdata.validPassword);
			cy.fixture('selector').then(sel => {
				cy.get(sel.login).then((elements) => {
					expect(elements[0].checkValidity()).to.be.false
					expect(elements[0].validationMessage).to.be.eql('Заполните это поле.');
				})
			})
		})
	})

	it('unsuccessful authorization as administrator with empty field password', () => {
		cy.fixture('user_data').then(function (regdata) {
			this.regdata = regdata;
			cy.login(regdata.validEmail, regdata.emptyFieldPass);
			cy.fixture('selector').then(sel => {
				cy.get(sel.pass).then((elements) => {
					expect(elements[0].checkValidity()).to.be.false
					expect(elements[0].validationMessage).to.be.eql('Заполните это поле.');
				})
			})
		})
	})

	it('unsuccessful authorization as administrator with empty field password and email', () => {
		cy.fixture('user_data').then(function (regdata) {
			this.regdata = regdata;
			cy.login(regdata.emptyFieldEmail, regdata.emptyFieldPass);
			cy.fixture('selector').then(sel => {
				cy.get(sel.login).then((elements) => {
					expect(elements[0].checkValidity()).to.be.false
					expect(elements[0].validationMessage).to.be.eql('Заполните это поле.');
				})
			})
		})
	})
})


describe('booking a film whose title was received from the admin', () => {
	it('successfully getting the movie title from the admin', () => {
		cy.authorization('user', 'Управление залами');
		cy.fixture('selector').then(sel => {
			cy.get(sel.film_name_admin).then(($el) => $el.textContent).should('have.text', 'Зверополис');
			cy.get(sel.film_name_admin).invoke('text').then((text) => {
				cy.open('/', 'Идём');
				cy.clickElement(sel.day_3);
				cy.get(sel.film_name_1).should('have.text', text);
				cy.clickElement(sel.time);
				cy.clickElement(sel.seat_1);
				cy.clickElement(sel.seat_2);
				cy.clickElement(sel.button_booking)
				cy.visibleText('Получить код бронирования')
			})
		})
	})
})

