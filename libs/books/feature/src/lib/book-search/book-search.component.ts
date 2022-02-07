import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getBooks,
  getReadingListBookIds,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnDestroy {
  books$: Observable<Book[]>;
  readingListBookIds$: Observable<string[] | number[]>;

  private destroy$: Subject<void> = new Subject<void>();

  searchForm = this.fb.group({
    term: ''
  });

  constructor(private readonly store: Store, private readonly fb: FormBuilder) {
    this.books$ = this.store.select(getBooks);
    this.readingListBookIds$ = this.store.select(getReadingListBookIds);
    this.provideBookSearch();
  }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
  }

  private provideBookSearch() {
    this.searchForm.controls.term.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe(searchTerm =>
        searchTerm.trim()
          ? this.store.dispatch(searchBooks({ term: searchTerm }))
          : this.store.dispatch(clearSearch())
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
