import { createFeatureSelector, createSelector } from '@ngrx/store';

import { getRouterInfo } from '@core/store/routes/route.selectors';
import {
  BenchmarkState,
  initialBenchmark,
  initialBenchmarkState,
  initialOptimization,
  initialOptimizationState,
  initialStudy,
  initialStudyState,
  OptimizationState,
  ProjectState,
  StudyState,
} from '@core/store/project/project.interfaces';

export const selectProjectState = createFeatureSelector<ProjectState>('project');
export const getHasProjectLoaded = createSelector(
  selectProjectState,
  (state: ProjectState, props): boolean => {
    if (state.id != props.projectId) return false;
    return state.loading || state.success || state.error != null;
  }
);

export const getCurrentStudyState = createSelector(
  selectProjectState,
  getRouterInfo,
  (state: ProjectState, routerInfo): StudyState => {
    if (!routerInfo) return null;

    let study = { ...initialStudy };

    if (state && !state.error && state.studies.length > 0) {
      const id = routerInfo.params.studyId;
      if (!id) return null;

      study = state.studies.find((study) => study.id === id);
    }

    if (study == null) {
      return {
        ...initialStudyState,
        error: { message: 'The study could not be found.' },
      };
    }

    return {
      ...study,
      loading: state.loading,
      success: state.success,
      error: state.error,
    };
  }
);

export const getCurrentOptimizationState = createSelector(
  getCurrentStudyState,
  getRouterInfo,
  (state: StudyState, routerInfo): OptimizationState => {

    if (!routerInfo) return null;
    if (!state) return null;

    let optimization = { ...initialOptimization };

    if (state && !state.error && state.optimizations.length > 0) {
      const id = routerInfo.params.optimizationId;

      if (!id) return null;

      optimization = state.optimizations.find((optimization) => optimization.id === id);
    }

    if (optimization == null) {
      return {
        ...initialOptimizationState,
        error: { message: 'The optimization could not be found.' },
      };
    }

    return {
      ...optimization,
      loading: state.loading,
      success: state.success,
      error: state.error,
    };
  }
);

export const getCurrentBenchmarkState = createSelector(
  getCurrentStudyState,
  getRouterInfo,
  (state: StudyState, routerInfo): BenchmarkState => {
    if (!routerInfo) return null;

    let benchmark = { ...initialBenchmark };

    if (state && !state.error && state.benchmarks.length > 0) {
      const id = routerInfo.params.benchmarkId;

      if (!id) return null;

      benchmark = state.benchmarks.find((benchmark) => benchmark.id === id);
    }

    if (benchmark == null) {
      return {
        ...initialBenchmarkState,
        error: { message: 'The benchmark could not be found.' },
      };
    }

    return {
      ...benchmark,
      loading: state.loading,
      success: state.success,
      error: state.error,
    };
  }
);
