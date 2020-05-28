import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectsState } from '@core/store/projects/projects.interfaces';

export const selectProjectsState = createFeatureSelector<ProjectsState>('projects');
export const getHasProjectsLoaded = createSelector(
  selectProjectsState,
  (state: ProjectsState): boolean =>
    state.loading || state.success || state.error != null
);
