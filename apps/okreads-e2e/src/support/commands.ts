// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      startAt: typeof startAt;
      getByTestAttr: typeof getByTestAttr;
      cleanupReadingList: typeof cleanupReadingList;
    }
  }
}

function startAt(url) {
  cy.visit(url);
  cy.get('tmo-root').should('contain.text', 'okreads');
}

function getByTestAttr(selector, ...args) {
  return cy.get(`[data-testing=${selector}]`, ...args);
}

function cleanupReadingList() {
  cy.getByTestAttr('toggle-reading-list').click();

  cy.get('body').then($body => {
    if ($body.find('[data-testing="reading-list-item"]').length) {
      cy.getByTestAttr('remove-button').click({
        multiple: true
      });
    }
  });

  cy.getByTestAttr('reading-list-close-button').click();
}

Cypress.Commands.add('startAt', startAt);
Cypress.Commands.add('getByTestAttr', getByTestAttr);
Cypress.Commands.add('cleanupReadingList', cleanupReadingList);

export {};
