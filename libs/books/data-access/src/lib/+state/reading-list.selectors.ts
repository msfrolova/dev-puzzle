import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  READING_LIST_FEATURE_KEY,
  readingListAdapter,
  ReadingListPartialState,
  State
} from './reading-list.reducer';

export const getReadingListState = createFeatureSelector<
  ReadingListPartialState,
  State
>(READING_LIST_FEATURE_KEY);

const {
  selectEntities,
  selectAll,
  selectTotal,
  selectIds
} = readingListAdapter.getSelectors();

export const getReadingListEntities = createSelector(
  getReadingListState,
  selectEntities
);

export const getReadingList = createSelector(getReadingListState, selectAll);

export const getReadingListBookIds = createSelector(
  getReadingListState,
  selectIds
);

export const getTotalUnread = createSelector(getReadingListState, selectTotal);

export const getFinishedBookIds = createSelector(getReadingList, books =>
  books.filter(book => book.finished).map(book => book.id)
);
