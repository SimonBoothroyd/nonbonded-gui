import { createFeatureSelector, createSelector } from '@ngrx/store';

import { getRouterInfo } from '@core/store/routes/route.selectors';
import {
  initialOptimization,
  initialOptimizationState,
  initialProject,
  initialProjectState,
  initialStudy,
  initialStudyState,
  OptimizationState,
  ProjectCollectionState,
  ProjectState,
  StudyState,
} from '@core/store/projects/projects.interfaces';

export const selectProjectsState = createFeatureSelector<ProjectCollectionState>(
  'projects'
);
export const getHasProjectsLoaded = createSelector(
  selectProjectsState,
  (state: ProjectCollectionState): boolean =>
    state.loading || state.success || state.error != null
);

export const getCurrentProjectState = createSelector(
  selectProjectsState,
  getRouterInfo,
  (state: ProjectCollectionState, routerInfo): ProjectState => {
    if (!routerInfo) return null;

    let project = { ...initialProject };

    if (state && state.projects.length > 0) {
      const id = routerInfo.params.projectId;

      if (!id) return null;

      project = state.projects.find((project) => project.identifier === id);
    }

    if (project == null) {
      return {
        ...initialProjectState,
        error: { message: 'The project could not be found.' },
      };
    }

    return {
      ...project,
      loading: state.loading,
      success: state.success,
      error: state.error,
    };
  }
);

export const getCurrentStudyState = createSelector(
  getCurrentProjectState,
  getRouterInfo,
  (state: ProjectState, routerInfo): StudyState => {
    if (!routerInfo) return null;

    let study = { ...initialStudy };

    if (state && !state.error && state.studies.length > 0) {
      const id = routerInfo.params.studyId;

      if (!id) return null;

      study = state.studies.find((study) => study.identifier === id);
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

    let optimization = { ...initialOptimization };

    if (state && !state.error && state.optimizations.length > 0) {
      const id = routerInfo.params.optimizationId;

      if (!id) return null;

      optimization = state.optimizations.find(
        (optimization) => optimization.identifier === id
      );
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
