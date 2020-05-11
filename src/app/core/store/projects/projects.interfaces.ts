import { Optimization, Project, ProjectCollection, Study } from '@core/models/projects';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

export const initialProject: Project = {
  identifier: '',
  title: '',
  abstract: '',
  authors: [],
  studies: [],
};

export const initialStudy: Study = {
  identifier: '',
  title: '',
  description: '',
  optimizations: [],
  optimization_inputs: null,
  target_test_set: null,
  initial_force_field: '',
};

export const initialOptimization: Optimization = {
  identifier: '',
  title: '',
  description: '',
  target_training_set: null,
  parameters_to_train: [],
};

export const initialProjectCollection: ProjectCollection = {
  projects: [],
};

export interface ProjectState extends Loadable, Project {}

export interface StudyState extends Loadable, Study {}

export interface OptimizationState extends Loadable, Optimization {}

export interface ProjectCollectionState extends Loadable, ProjectCollection {}

export const initialProjectState: ProjectState = {
  ...createDefaultLoadable(),
  ...initialProject,
};

export const initialStudyState: StudyState = {
  ...createDefaultLoadable(),
  ...initialStudy,
};

export const initialOptimizationState: OptimizationState = {
  ...createDefaultLoadable(),
  ...initialOptimization,
};

export const initialProjectCollectionState: ProjectCollectionState = {
  ...createDefaultLoadable(),
  ...initialProjectCollection,
};
