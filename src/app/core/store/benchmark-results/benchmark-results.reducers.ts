import { withLoadable } from '@core/loadable/with-loadable';
import {
  initialBenchmarkResultsState,
  BenchmarkResultsState,
} from '@core/store/benchmark-results/benchmark-results.interfaces';
import {
  BenchmarkResultsActions,
  BenchmarkResultsActionsTypes,
} from '@core/store/benchmark-results/benchmark-results.actions';

function baseReducer(
  state: BenchmarkResultsState = { ...initialBenchmarkResultsState },
  action: BenchmarkResultsActions
): BenchmarkResultsState {
  switch (action.type) {
    case BenchmarkResultsActionsTypes.Load:
      return {
        ...state,
        projectId: action.projectId,
        studyId: action.studyId,
      };
    case BenchmarkResultsActionsTypes.LoadSuccess:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function reducer(
  state: BenchmarkResultsState,
  action: BenchmarkResultsActions
): BenchmarkResultsState {
  return withLoadable(baseReducer, {
    loadingActionType: BenchmarkResultsActionsTypes.Load,
    successActionType: BenchmarkResultsActionsTypes.LoadSuccess,
    errorActionType: BenchmarkResultsActionsTypes.LoadError,
  })(state, action);
}
