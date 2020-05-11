import { createFeatureSelector, createSelector } from '@ngrx/store';

import { getRouterInfo } from '@core/store/routes/route.selectors';
import {
  DataSetCollectionState,
  DataSetState,
  initialDataSet,
  initialDataSetState,
} from '@core/store/datasets/datasets.interfaces';

export const selectDataSetState = createFeatureSelector<DataSetCollectionState>(
  'datasets'
);
export const getHasDataSetsLoaded = createSelector(
  selectDataSetState,
  (state: DataSetCollectionState): boolean =>
    state.loading || state.success || state.error != null
);

export const getDataSetState = createSelector(
  selectDataSetState,
  getRouterInfo,
  (state: DataSetCollectionState, routerInfo): DataSetState => {
    let data_set = { ...initialDataSet };

    if (state && state.data_sets.length > 0) {
      const projectId = routerInfo.params.projectId;
      const studyId = routerInfo.params.studyId;

      if (!projectId || !studyId) return null;

      let optimizationId = routerInfo.params.optimizationId;

      if (!optimizationId) optimizationId = null;

      data_set = state.data_sets.find(
        (x) =>
          x.project_identifier == projectId &&
          x.study_identifier == studyId &&
          x.optimization_identifier == optimizationId
      );
    }

    if (data_set == null) {
      return {
        ...initialDataSetState,
        error: { message: 'The project could not be found.' },
      };
    }

    return {
      ...data_set,
      loading: state.loading,
      success: state.success,
      error: state.error,
    };
  }
);
