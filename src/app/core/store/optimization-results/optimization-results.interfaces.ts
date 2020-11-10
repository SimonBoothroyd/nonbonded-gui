import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';
import { Figure } from '@core/models/plotly';

export interface OptimizationResults {
  objectiveFunction?: Figure;
}

export const initialOptimizationResults: OptimizationResults = {
  objectiveFunction: null,
};

export interface OptimizationResultsState extends Loadable, OptimizationResults {}

export const initialOptimizationResultsState: OptimizationResultsState = {
  ...createDefaultLoadable(),
  ...initialOptimizationResults,
};
