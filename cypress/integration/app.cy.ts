import ingredients from '../fixtures/ingredients.json';
import order from '../fixtures/order.json';

describe('Проверка доступности приложения', function () {
  beforeEach(() => {
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.viewport(1300, 800);

    cy.visit('/');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Добавление ингредиента из списка в конструктор', function () {
    cy.get(`[data-cy="order-sum"]`).as('orderSum');
    cy.get('[data-cy="constructor-ingredients"]').as('constructorIngredients');

    cy.get(`[data-cy="${ingredients.data[0].name}"]`)
      .contains('Добавить')
      .click();
    cy.get('@orderSum').contains('2510').should('exist');
    cy.get('[data-cy="constructor-bun"]')
      .contains(ingredients.data[0].name)
      .should('exist');

    cy.get(`[data-cy="${ingredients.data[1].name}"]`)
      .contains('Добавить')
      .click();
    cy.get('@orderSum').contains('2525').should('exist');
    cy.get('@constructorIngredients')
      .contains(ingredients.data[1].name)
      .should('exist');

    cy.get(`[data-cy="${ingredients.data[2].name}"]`)
      .contains('Добавить')
      .click();
    cy.get('@orderSum').contains('6925').should('exist');
    cy.get('@constructorIngredients')
      .contains(ingredients.data[2].name)
      .should('exist');

    cy.get(`[data-cy="${ingredients.data[3].name}"]`)
      .contains('Добавить')
      .click();
    cy.get('@orderSum').contains('11067').should('exist');
    cy.get('@constructorIngredients')
      .contains(ingredients.data[3].name)
      .should('exist');
  });

  it('Проверка корректной работы модального окна', function () {
    const ingredient = ingredients.data[0];

    cy.contains(ingredient.name).click();

    cy.get('[data-cy="modal"]').as('modal');
    cy.get('@modal').should('exist');

    cy.contains(ingredient.name).should('exist');

    // Проверяем БЖУ
    cy.contains(`Калории, ккал${ingredient.calories}`).should('exist');
    cy.contains(`Белки, г${ingredient.proteins}`).should('exist');
    cy.contains(`Жиры, г${ingredient.fat}`).should('exist');
    cy.contains(`Углеводы, г${ingredient.carbohydrates}`).should('exist');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');
  });

  it('Проверка корректной работы создания заказа', function () {
    const bun = ingredients.data[0];
    const sauce = ingredients.data[1];
    const main = ingredients.data[2];

    cy.get(`[data-cy="${bun.name}"]`)
      .find('button')
      .contains('Добавить')
      .click();

    cy.get(`[data-cy="${main.name}"]`)
      .find('button')
      .contains('Добавить')
      .click();

    cy.get(`[data-cy="${sauce.name}"]`)
      .find('button')
      .contains('Добавить')
      .click();

    cy.contains('Оформить заказ').click();

    cy.get('[data-cy="modal"]').should('exist');
    cy.contains('Ваш заказ начали готовить').should('exist');
    cy.contains(order.order.number.toString()).should('exist');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="constructor-ingredients"]')
      .contains(ingredients.data[0].name)
      .should('not.exist');
    cy.get('[data-cy="constructor-ingredients"]')
      .contains(ingredients.data[1].name)
      .should('not.exist');
      cy.get('[data-cy="constructor-ingredients"]')
      .contains(ingredients.data[2].name)
      .should('not.exist');
  });
});
