import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

import { BenchmarkResult } from '@core/models/results';

export interface BenchmarkResults {

  projectId: string;
  studyId: string;

  results: BenchmarkResult[];
}

export const initialBenchmarkResults: BenchmarkResults = {
  projectId: '',
  studyId: '',

  results: [],
};

export interface BenchmarkResultsState extends Loadable, BenchmarkResults {}

export const initialBenchmarkResultsState: BenchmarkResultsState = {
  ...createDefaultLoadable(),
  ...initialBenchmarkResults,
};
