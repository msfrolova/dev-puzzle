describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
});

describe('When: I press undo for add book action', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able add same book again', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="add-to-list-button"]:not([disabled])')
      .first()
      .as('addToListButton')
      .click()
      .should('be.disabled');

    cy.contains('Undo').click();

    cy.get('@addToListButton').should('not.be.disabled');
  });
});

describe('When: I press undo for remove book action', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should remain seeing removed book in my reading list', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="add-to-list-button"]:not([disabled])')
      .first()
      .click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="remove-book-button"]')
      .first()
      .as('removeBookButton')
      .click();

    // it's a second snackbar that was visible, so we can query it using id with index
    cy.get('#cdk-overlay-1').contains('Undo').click();

    cy.get('@removeBookButton').should('exist');
  });
});
