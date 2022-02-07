### **Important**

- working on this assignment was faced issues with corrupted `jest` cache, but can’t reproduce it constantly.
  If you will face any errors running unit tests please, try to run `npx jest --clearCache` to make sure unit test fails not because of the cache.

### Fixed code smells

- `BookSearchComponent` contained unsubscribed subscription in `ngOnInit`

- `removeFromReadingList` function had parameter without a type

- `searchBooksFailure` action props type `any` was changed to `HttpErrorResponse`

### Code improvements

#### implemented

- fixed 2 initially failing tests.

- `this.books` variable in `tmo-book-search` component was not used in .ts file. Subscription
  handled through `async` pipe in template.

- `formatDate()` function in `BookSearchComponent` changed by `DatePipe` with `M/dd/YYYY` as date
  format.

- property binding `<p [innerHTML]="b.description"></p>` replaced with one-way-binding `<p>{{ b.description }}</p>`. `b.description` value is a string, no need to bind it to HTML element.

- there is no need to use `join(,)`, usage of `{{}}` is equal to string interpolation, and resolved array items are displayed with commas already. Unless the intention was to have space after each comma, but in that case, my suggestion would be to make custom pipe for it (`join(,)` did not add spaces).

- removed unused lifecycle hooks from components.

- refactored the logic responsible for getting reading book ids for check if book is added to the reading list. Was refactored bits in the selector and `tmo-book-search` component.

- removed redundant `ReadingListItem` model, code refactored accordingly.

#### suggestions

- could be created a nested library in `shared` for constants, there could be added a date format `M/dd/YYYY` used for `DatePipe` mentioned earlier.

- implement global error handler using HttpInterceptor to trigger notification for user with according error message.

- nx.json lacks scope constraints.

- cover feature lib with unit tests.

### Accessibility issues in app

#### Found using Lighthouse

- was no accessible name fro search button.

- low-contrast text on 'Reading list' button and text 'Try searching for a topic, for example'.

#### Additional accessibility issues found in templates

- added accessible name to button 'Want to Read'.

- added accessible name to anchor tag 'JavaScript'.

- added accessible name to close button on reading list panel.
