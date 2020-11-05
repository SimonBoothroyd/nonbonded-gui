import { createFeatureSelector } from '@ngrx/store';
import { ProjectsState } from '@core/store/projects/projects.interfaces';

export const selectProjectsState = createFeatureSelector<ProjectsState>('projects');
