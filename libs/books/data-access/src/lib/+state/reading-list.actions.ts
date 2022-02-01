import { createAction, props } from '@ngrx/store';
import { Book } from '@tmo/shared/models';

export const init = createAction('[Reading List] Initialize');

export const loadReadingListSuccess = createAction(
  '[Reading List API] Load list success',
  props<{ list: Book[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List API] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Books Search Results] Add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List API] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List API] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Books Search Results] Remove from list',
  props<{ book: Book }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List API] Failed remove from list',
  props<{ book: Book }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List API] Confirmed remove from list',
  props<{ book: Book }>()
);

export const undoAddToReadingList = createAction(
  '[Books Search Results] Undo add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingListUndoAction = createAction(
  '[Books Search Results] Confirmed undo add to list',
  props<{ book: Book }>()
);

export const undoRemoveFromReadingList = createAction(
  '[Books Search Results] Undo remove from list',
  props<{ book: Book }>()
);

export const confirmedRemoveFromReadingListUndoAction = createAction(
  '[Books Search Results] Confirmed undo remove from list',
  props<{ book: Book }>()
);
