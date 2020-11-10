import { withLoadable } from '@core/loadable/with-loadable';

import {
  initialOptimizationResultsState,
  OptimizationResultsState,
} from '@core/store/optimization-results/optimization-results.interfaces';
import {
  OptimizationResultsActions,
  OptimizationResultsActionsTypes,
} from '@core/store/optimization-results/optimization-results.actions';

function baseReducer(
  state: OptimizationResultsState = { ...initialOptimizationResultsState },
  action: OptimizationResultsActions
): OptimizationResultsState {
  switch (action.type) {
    case OptimizationResultsActionsTypes.LoadSuccess:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function reducer(
  state: OptimizationResultsState,
  action: OptimizationResultsActions
): OptimizationResultsState {
  return withLoadable(baseReducer, {
    loadingActionType: OptimizationResultsActionsTypes.Load,
    successActionType: OptimizationResultsActionsTypes.LoadSuccess,
    errorActionType: OptimizationResultsActionsTypes.LoadError,
  })(state, action);
}
