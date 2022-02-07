import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import { Book } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<Book> {
  loaded: boolean;
  error?: null | string;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<Book> = createEntityAdapter<
  Book
>({
  selectId: item => item.id
});

export const initialState: State = readingListAdapter.getInitialState({
  loaded: false
});

const readingListReducer = createReducer(
  initialState,
  on(ReadingListActions.init, state => {
    return {
      ...state,
      loaded: false,
      error: null
    };
  }),
  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(ReadingListActions.loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(ReadingListActions.addToReadingList, (state, action) =>
    readingListAdapter.addOne(action.book, state)
  ),
  on(ReadingListActions.removeFromReadingList, (state, action) =>
    readingListAdapter.removeOne(action.book.id, state)
  )
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
