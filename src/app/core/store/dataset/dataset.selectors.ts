import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DataSetState, initialDataSetState } from './dataset.interfaces';
import { getRouterInfo } from '@core/store/routes/route.selectors';

export const selectDataSetState = createFeatureSelector<DataSetState>('dataset');
export const getHasDataSetLoaded = createSelector(
  selectDataSetState,
  (state: DataSetState, props): boolean => {
    if (state.id != props.dataSetId) return false;
    return state.loading || state.success || state.error != null;
  }
);

export const getDataTypeFilters = createSelector(
  getRouterInfo,
  (routerInfo): string[] => {
    if (!routerInfo) return null;

    const filterString = routerInfo.queryParams['types'];
    return !filterString ? [] : filterString.split(',');
  }
);

export const getFilteredDataSet = createSelector(
  selectDataSetState,
  getDataTypeFilters,
  (state: DataSetState, typeFilters): DataSetState => {
    if (!typeFilters || !state) return null;

    if (state.error) {
      return { ...initialDataSetState, error: state.error };
    }
    if (state.loading) {
      return { ...initialDataSetState, loading: state.loading };
    }

    if (typeFilters.length == 0) return { ...state };

    const filteredEntries = {};

    // Filter by the data type.
    Object.entries(state.entries).forEach(([k, v]) => {
      const dataTypes = v.map((entry) => entry.dataType);
      const matches = typeFilters.every((v) => dataTypes.includes(v));

      if (!matches) return;
      filteredEntries[k] = v;
    });

    return { ...state, entries: filteredEntries };
  }
);
