import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule, MatSnackBarModule, NoopAnimationsModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: MatSnackBar,
          useValue: {
            open: () => ({
              onAction: () => of({})
            })
          }
        }
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
    jest.spyOn(effects, 'showSnackBar');
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });

  describe('add book undo action', () => {
    const book = createBook('A');
    it('showUndoOptionForAddAction$ should dispatch undoAddToReadingList', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.confirmedAddToReadingList({ book }));

      effects.showUndoOptionForAddAction$.subscribe(action => {
        expect(effects.showSnackBar).toHaveBeenCalledWith(
          'In order to remove book hit undo'
        );

        expect(action).toEqual(
          ReadingListActions.undoAddToReadingList({ book })
        );

        done();
      });
    });

    it('handleAddBookUndoAction$ should dispatch confirmedAddToReadingListUndoAction', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.undoAddToReadingList({ book }));

      effects.handleAddBookUndoAction$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.confirmedAddToReadingListUndoAction({
            book
          })
        );
        done();
      });

      httpMock.expectOne(`/api/reading-list/${book.id}`).flush({});
    });
  });

  describe('remove book undo action', () => {
    const book = createBook('B');

    it('showUndoOptionForRemoveAction$ should dispatch undoRemoveFromReadingList', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.confirmedRemoveFromReadingList({ book }));

      effects.showUndoOptionForRemoveAction$.subscribe(action => {
        expect(effects.showSnackBar).toHaveBeenCalledWith(
          'In order to keep the book hit undo'
        );

        expect(action).toEqual(
          ReadingListActions.undoRemoveFromReadingList({ book })
        );
        done();
      });
    });

    it('handleRemoveBookUndoAction$ should confirmedRemoveFromReadingListUndoAction', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.undoRemoveFromReadingList({ book }));

      effects.handleRemoveBookUndoAction$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.confirmedRemoveFromReadingListUndoAction({
            book
          })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush({});
    });
  });
});
