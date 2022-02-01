import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { Book } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<Book[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.confirmedAddToReadingList({ book })),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ book }) =>
        this.http.delete(`/api/reading-list/${book.id}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ book })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ book }))
          )
        )
      )
    )
  );

  showUndoOptionForAddAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedAddToReadingList),
      concatMap(({ book }) =>
        this.showSnackBar('In order to remove book hit undo').pipe(
          map(() => ReadingListActions.undoAddToReadingList({ book }))
        )
      )
    )
  );

  showUndoOptionForRemoveAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedRemoveFromReadingList),
      concatMap(({ book }) =>
        this.showSnackBar('In order to keep the book hit undo').pipe(
          map(() => ReadingListActions.undoRemoveFromReadingList({ book }))
        )
      )
    )
  );

  handleAddBookUndoAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoAddToReadingList),
      concatMap(({ book }) =>
        this.http.delete(`/api/reading-list/${book.id}`).pipe(
          map(() =>
            ReadingListActions.confirmedAddToReadingListUndoAction({
              book
            })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ book }))
          )
        )
      )
    )
  );

  handleRemoveBookUndoAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoRemoveFromReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingListUndoAction({
              book
            })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ book }))
          )
        )
      )
    )
  );

  showSnackBar(message: string): Observable<void> {
    return this.snackBar
      .open(message, 'Undo', {
        duration: 4000,
        verticalPosition: 'top'
      })
      .onAction();
  }

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}
}
