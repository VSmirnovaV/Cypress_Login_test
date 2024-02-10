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
    cy.authorization('user', 'Управление залами');
    });
  
  it('unsuccessful authorization as administrator with wrong data', () => {
    cy.cycle('wrong_data', 'Ошибка авторизации');
    });

  it('unsuccessful authorization as administrator with empty field', () => {
    cy.cycle('empty_field', 'Заполните это поле.')
  })
});

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

