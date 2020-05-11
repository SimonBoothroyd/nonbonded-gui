import { withLoadable } from '@core/loadable/with-loadable';
import {
  BenchmarkResultsState,
  initialBenchmarkResultsState,
  OptimizationResultsState,
  initialOptimizationResultsState,
} from '@core/store/results/results.interfaces';
import {
  BenchmarksActions,
  BenchmarksActionsTypes,
  OptimizationsActions,
  OptimizationsActionsTypes,
} from '@core/store/results/results.actions';

function baseBenchmarksReducer(
  state: BenchmarkResultsState = { ...initialBenchmarkResultsState },
  action: BenchmarksActions
): BenchmarkResultsState {
  switch (action.type) {
    case BenchmarksActionsTypes.LoadSuccess:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function benchmarksReducer(
  state: BenchmarkResultsState,
  action: BenchmarksActions
): BenchmarkResultsState {
  return withLoadable(baseBenchmarksReducer, {
    loadingActionType: BenchmarksActionsTypes.Load,
    successActionType: BenchmarksActionsTypes.LoadSuccess,
    errorActionType: BenchmarksActionsTypes.LoadError,
  })(state, action);
}

function baseOptimizationsReducer(
  state: OptimizationResultsState = { ...initialOptimizationResultsState },
  action: OptimizationsActions
): OptimizationResultsState {
  switch (action.type) {
    case OptimizationsActionsTypes.LoadSuccess:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function optimizationsReducer(
  state: OptimizationResultsState,
  action: OptimizationsActions
): OptimizationResultsState {
  return withLoadable(baseOptimizationsReducer, {
    loadingActionType: OptimizationsActionsTypes.Load,
    successActionType: OptimizationsActionsTypes.LoadSuccess,
    errorActionType: OptimizationsActionsTypes.LoadError,
  })(state, action);
}
