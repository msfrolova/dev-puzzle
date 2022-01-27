describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    const searchPhrase = 'javascript';

    cy.get('input[type="search"]').type(searchPhrase);

    cy.get('[data-testing="book-item"]')
      .first()
      .find('[data-testing="book-title"]')
      .contains(searchPhrase, { matchCase: false });
  });

  it('Then: I should see search results as I am typing', () => {
    cy.get('input[type="search"]').as('searchInput').type('javascript');

    cy.get('[data-testing="book-item"]').first().as('bookItem');

    cy.get('@searchInput').clear().type('haskell');

    cy.get('@bookItem').should('not.exist');
  });
});
