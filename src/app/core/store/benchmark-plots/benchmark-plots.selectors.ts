import { createFeatureSelector } from '@ngrx/store';
import { BenchmarkPlots } from '@core/store/benchmark-plots/benchmark-plots.interfaces';

export const selectBenchmarkPlots = createFeatureSelector<BenchmarkPlots>(
  'benchmarkPlots'
);
