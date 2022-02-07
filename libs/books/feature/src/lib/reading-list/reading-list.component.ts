import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  markBookAsRead,
  removeFromReadingList
} from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(book: Book) {
    this.store.dispatch(removeFromReadingList({ book }));
  }

  markAsRead(book: Book) {
    this.store.dispatch(markBookAsRead({ book }));
  }
}
