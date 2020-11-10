import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';
import { Figure } from '@core/models/plotly';

export interface BenchmarkResults {
  overallRMSE?: Figure;
  scatter: { [propertyType: string]: Figure };
}

export const initialBenchmarkResults: BenchmarkResults = {
  overallRMSE: null,
  scatter: {},
};

export interface BenchmarkResultsState extends Loadable, BenchmarkResults {}

export const initialBenchmarkResultsState: BenchmarkResultsState = {
  ...createDefaultLoadable(),
  ...initialBenchmarkResults,
};
