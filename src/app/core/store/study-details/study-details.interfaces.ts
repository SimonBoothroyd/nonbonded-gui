import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

import { BenchmarkResult } from '@core/models/benchmark';
import { OptimizationResult } from '@core/models/optimization';

import { DataSet } from '@core/models/datasets';

export interface StudyDetails {
  optimizationResults: OptimizationResult[];
  benchmarkResults: BenchmarkResult[];

  dataSets: DataSet[];
}

export const initialStudyDetails: StudyDetails = {
  optimizationResults: [],
  benchmarkResults: [],
  dataSets: [],
};

export interface StudyDetailsState extends Loadable, StudyDetails {}

export const initialStudyDetailsState: StudyDetailsState = {
  ...createDefaultLoadable(),
  ...initialStudyDetails,
};

export interface ErrorBar {
  type: 'data';
  symmetric: boolean;

  array: number[];
  arrayminus: number[];
}

export interface Marker {
  color: string;
}

export interface BarTrace {
  type: 'bar';

  name: string;

  x: string[];
  y: number[];

  error_y: ErrorBar;

  marker: Marker;

  xaxis: string;
  yaxis: string;

  index: number;

  legendgroup: string;
  showlegend: boolean;

  hoverinfo: 'none';
}

export interface TestSummaryStatistics {
  traces: BarTrace[];
  propertyTitles: string[];
}

export const initialTestSummaryStatistics: TestSummaryStatistics = {
  traces: [],
  propertyTitles: [],
};

export interface TestSummaryStatisticsState extends Loadable, TestSummaryStatistics {}

export const initialTestSummaryStatisticsState: TestSummaryStatisticsState = {
  ...createDefaultLoadable(),
  ...initialTestSummaryStatistics,
};

export interface ScatterTrace {
  type: 'scatter';
  mode: 'markers';

  name: string;

  x: string[];
  y: number[];

  marker: Marker;

  xaxis: string;
  yaxis: string;

  index: number;

  legendgroup: string;
  showlegend: boolean;

  // hoverinfo: '';
}

export const initialScatterTrace: ScatterTrace = {
  type: 'scatter',
  mode: 'markers',

  name: '',

  x: [],
  y: [],

  marker: { color: '#ffffff' },

  xaxis: 'x',
  yaxis: 'y',

  index: 0,

  legendgroup: '',
  showlegend: false,

  // hoverinfo: 'none'
}

export interface TestResults {
  traces: {[propertyName: string]: ScatterTrace[]};
  benchmarkNames: string[];
}

export const initialTestResults: TestResults = {
  traces: {},
  benchmarkNames: [],
};

export interface TestResultsState extends Loadable, TestResults {}

export const initialTestResultsState: TestResultsState = {
  ...createDefaultLoadable(),
  ...initialTestResults,
};
