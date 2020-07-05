import { Benchmark, Optimization, Project, Study } from '@core/models/projects';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

export const initialProject: Project = {
  id: '',
  name: '',
  description: '',
  authors: [],
  studies: [],
};

export const initialStudy: Study = {
  id: '',
  project_id: '',
  name: '',
  description: '',
  optimizations: [],
  benchmarks: [],
};

export const initialOptimization: Optimization = {
  id: '',
  study_id: '',
  project_id: '',
  name: '',
  description: '',
  training_set_ids: [],
  initial_force_field: null,
  parameters_to_train: [],
  force_balance_input: null,
  denominators: {},
  priors: {},
  analysis_environments: [],
};

export const initialBenchmark: Benchmark = {
  id: '',
  study_id: '',
  project_id: '',
  name: '',
  description: '',
  test_set_ids: [],
  optimization_id: null,
  force_field: null,
  analysis_environments: [],
};

export interface ProjectState extends Loadable, Project {}

export interface StudyState extends Loadable, Study {}

export interface OptimizationState extends Loadable, Optimization {}

export interface BenchmarkState extends Loadable, Benchmark {}

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

export const initialBenchmarkState: BenchmarkState = {
  ...createDefaultLoadable(),
  ...initialBenchmark,
};
