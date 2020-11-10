import { createFeatureSelector } from '@ngrx/store';
import { BenchmarkResultsState } from '@core/store/benchmark-results/benchmark-results.interfaces';

export const selectBenchmarkResultsState = createFeatureSelector<BenchmarkResultsState>(
  'benchmarkResults'
);
