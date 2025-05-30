/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Устанавливает значение в localStorage
       * @example cy.setLocalStorage('token', 'abc123')
       */
      setLocalStorage(key: string, value: string): Chainable<Window>;

      /**
       * Получает всё содержимое localStorage
       * @example cy.getAllLocalStorage()
       */
      getAllLocalStorage(): Chainable<{ [key: string]: string }>;
    }
  }
}

// Команда установки значения в localStorage
Cypress.Commands.add('setLocalStorage', (key: string, value: string) => {
  window.localStorage.setItem(key, value);
});

// Команда получения всего localStorage
Cypress.Commands.add('getAllLocalStorage', () => {
  const storage: { [key: string]: string } = {};

  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i)!;
    storage[key] = window.localStorage.getItem(key)!;
  }

  return cy.wrap(storage);
});

export {};
