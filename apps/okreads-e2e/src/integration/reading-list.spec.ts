describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.getByTestAttr('toggle-reading-list').click();

    cy.getByTestAttr('reading-list-container').should(
      'contain.text',
      'My Reading List'
    );
  });
});

describe('When: I use mark book as read', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to finish the book', () => {
    cy.cleanupReadingList();

    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.getByTestAttr('add-to-list-button')
      .first()
      .as('addToListButton')
      .click();

    cy.getByTestAttr('toggle-reading-list').click();

    cy.getByTestAttr('finished-book-icon').should('not.exist');

    cy.getByTestAttr('mark-as-read-button').click();

    cy.getByTestAttr('finished-book-icon').should('exist');

    cy.getByTestAttr('reading-list-close-button').click();

    cy.get('@addToListButton').should('contain.text', 'Finished');
  });
});
