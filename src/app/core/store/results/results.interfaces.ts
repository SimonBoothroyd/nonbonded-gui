import {
  BenchmarkResults,
  BenchmarkResultsCollection,
  OptimizationResult,
  OptimizationResultCollection,
} from '@core/models/results';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

export const initialBenchmarkResult: BenchmarkResults = {
  project_identifier: '',
  study_identifier: '',
  property_results: [],
};

export const initialBenchmarkResults: BenchmarkResultsCollection = {
  results: [],
};

export const initialOptimizationResult: OptimizationResult = {
  project_identifier: '',
  study_identifier: '',
  optimization_identifier: '',
  objective_function: {},
};

export const initialOptimizationResults: OptimizationResultCollection = {
  results: [],
};

export interface BenchmarkResultState extends Loadable, BenchmarkResults {}

export const initialBenchmarkResultState: BenchmarkResultState = {
  ...createDefaultLoadable(),
  ...initialBenchmarkResult,
};

export interface OptimizationResultState extends Loadable, OptimizationResult {}

export const initialOptimizationResultState: OptimizationResultState = {
  ...createDefaultLoadable(),
  ...initialOptimizationResult,
};

export interface BenchmarkResultsState extends Loadable, BenchmarkResultsCollection {}

export const initialBenchmarkResultsState: BenchmarkResultsState = {
  ...createDefaultLoadable(),
  ...initialBenchmarkResults,
};

export interface OptimizationResultsState
  extends Loadable,
    OptimizationResultCollection {}

export const initialOptimizationResultsState: OptimizationResultsState = {
  ...createDefaultLoadable(),
  ...initialOptimizationResults,
};
