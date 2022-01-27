import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { clearSearch, searchBooks } from '@tmo/books/data-access';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [provideMockStore()]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jest.spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('provideBookSearch', () => {
    it('should dispatch searchBooks action with javascript as param', fakeAsync(() => {
      const searchValue = 'javascript';

      component.searchForm.controls.term.setValue(searchValue);

      tick(500);

      expect(store.dispatch).toHaveBeenCalledWith(
        searchBooks({ term: searchValue })
      );
    }));

    it('should dispatch clearSearch action', fakeAsync(() => {
      component.searchForm.controls.term.setValue('   ');

      tick(500);

      expect(store.dispatch).toHaveBeenCalledWith(clearSearch());
    }));
  });
});
