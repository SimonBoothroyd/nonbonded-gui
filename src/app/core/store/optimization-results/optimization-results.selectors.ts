import { createFeatureSelector } from '@ngrx/store';
import { OptimizationResultsState } from '@core/store/optimization-results/optimization-results.interfaces';

export const selectOptimizationResultsState = createFeatureSelector<
  OptimizationResultsState
>('optimizationResults');
