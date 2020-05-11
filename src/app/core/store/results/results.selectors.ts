import { createFeatureSelector, createSelector } from '@ngrx/store';

import { getRouterInfo } from '@core/store/routes/route.selectors';

import {
  BenchmarkResultsState,
  BenchmarkResultState,
  initialBenchmarkResult,
  initialBenchmarkResultState,
  OptimizationResultsState,
  OptimizationResultState,
  initialOptimizationResult,
  initialOptimizationResultState,
} from '@core/store/results/results.interfaces';

export const selectBenchmarkResultsState = createFeatureSelector<BenchmarkResultsState>(
  'benchmarks'
);
export const getHasBenchmarkResultsLoaded = createSelector(
  selectBenchmarkResultsState,
  (state: BenchmarkResultsState): boolean =>
    state.loading || state.success || state.error != null
);

export const getBenchmarkResultState = createSelector(
  selectBenchmarkResultsState,
  getRouterInfo,
  (state: BenchmarkResultsState, routerInfo): BenchmarkResultState => {
    let benchmark_result = { ...initialBenchmarkResult };

    if (state && state.results.length > 0) {
      const projectId = routerInfo.params.projectId;
      const studyId = routerInfo.params.studyId;

      if (!projectId || !studyId) return null;

      let benchmarkId = routerInfo.params.benchmarkId;

      if (!benchmarkId) benchmarkId = null;

      benchmark_result = state.results.find(
        (x) => x.project_identifier == projectId && x.study_identifier == studyId
      );
    }

    if (benchmark_result == null) {
      return {
        ...initialBenchmarkResultState,
        error: { message: 'The benchmark result could not be found.' },
      };
    }

    return {
      ...benchmark_result,
      loading: state.loading,
      success: state.success,
      error: state.error,
    };
  }
);

export const selectOptimizationResultsState = createFeatureSelector<
  OptimizationResultsState
>('optimizations');
export const getHasOptimizationResultsLoaded = createSelector(
  selectOptimizationResultsState,
  (state: OptimizationResultsState): boolean =>
    state.loading || state.success || state.error != null
);

export const getOptimizationResultState = createSelector(
  selectOptimizationResultsState,
  getRouterInfo,
  (state: OptimizationResultsState, routerInfo): OptimizationResultState => {
    let optimization_result = { ...initialOptimizationResult };

    if (state && state.results.length > 0) {
      const projectId = routerInfo.params.projectId;
      const studyId = routerInfo.params.studyId;

      if (!projectId || !studyId) return null;

      let optimizationId = routerInfo.params.optimizationId;

      if (!optimizationId) optimizationId = null;

      optimization_result = state.results.find(
        (x) =>
          x.project_identifier == projectId &&
          x.study_identifier == studyId &&
          x.optimization_identifier == optimizationId
      );
    }

    if (optimization_result == null) {
      return {
        ...initialOptimizationResultState,
        error: { message: 'The optimization result could not be found.' },
      };
    }

    return {
      ...optimization_result,
      loading: state.loading,
      success: state.success,
      error: state.error,
    };
  }
);
