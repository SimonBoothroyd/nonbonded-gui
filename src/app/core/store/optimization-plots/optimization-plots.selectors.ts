import { createFeatureSelector } from '@ngrx/store';
import { OptimizationPlots } from '@core/store/optimization-plots/optimization-plots.interfaces';

export const selectOptimizationPlots = createFeatureSelector<OptimizationPlots>(
  'optimizationPlots'
);
