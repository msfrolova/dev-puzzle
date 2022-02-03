import * as ReadingListActions from './reading-list.actions';
import {
  initialState,
  readingListAdapter,
  reducer,
  State
} from './reading-list.reducer';
import { createBook } from '@tmo/shared/testing';

describe('Books Reducer', () => {
  describe('valid Books actions', () => {
    let state: State;

    beforeEach(() => {
      state = readingListAdapter.setAll(
        [createBook('A'), createBook('B')],
        initialState
      );
    });

    it('loadBooksSuccess should load books from reading list', () => {
      const list = [createBook('A'), createBook('B'), createBook('C')];
      const action = ReadingListActions.loadReadingListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(3);
    });

    it('failedAddToReadingList should undo book addition to the state', () => {
      const action = ReadingListActions.failedAddToReadingList({
        book: createBook('C')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B']);
    });

    it('failedRemoveFromReadingList should undo book removal from the state', () => {
      state = readingListAdapter.setOne(createBook('C'), state);

      const action = ReadingListActions.failedRemoveFromReadingList({
        book: createBook('C')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B', 'C']);
    });

    it('confirmedMarkBookAsRead: should update state with marked as read book', () => {
      const markedAsReadBook = {
        ...createBook('A'),
        finished: true,
        finishedDate: 'today'
      };
      const action = ReadingListActions.confirmedMarkBookAsRead({
        book: markedAsReadBook
      });

      state = readingListAdapter.updateOne(
        { id: markedAsReadBook.id, changes: markedAsReadBook },
        state
      );

      const result: State = reducer(state, action);

      expect(result.entities).toEqual({
        A: { ...markedAsReadBook },
        B: { ...createBook('B') }
      });
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
