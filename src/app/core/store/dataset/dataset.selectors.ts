import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DataSetState } from './dataset.interfaces';

export const selectDataSetState = createFeatureSelector<DataSetState>('dataset');
export const getHasDataSetLoaded = createSelector(
  selectDataSetState,
  (state: DataSetState, props): boolean => {
    if (state.id != props.dataSetId) return false;
    return state.loading || state.success || state.error != null;
  }
);
