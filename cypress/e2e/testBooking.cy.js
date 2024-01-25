describe('test home page elements display visible', () => {
  beforeEach(() => {
    cy.open('/', 'Идём');
  });

  it('test home page display', () => {
    cy.visibleTitle();
  });

  it('test be visible name films', () => {
    cy.visible();
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
})
