import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

import { BenchmarkResult } from '@core/models/benchmark';
import { OptimizationResult } from '@core/models/optimization';

import { DataSet } from '@core/models/datasets';
import { PlotData } from '@shared/components/plotly/plotly.interfaces';

export interface StudyDetails {
  projectId: string;
  studyId: string;

  optimizationResults: OptimizationResult[];
  benchmarkResults: BenchmarkResult[];

  dataSets: DataSet[];
}

export const initialStudyDetails: StudyDetails = {
  projectId: undefined,
  studyId: undefined,

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

export const initialBarTrace: BarTrace = {
  type: 'bar',

  name: '',

  x: [],
  y: [],

  error_y: undefined,

  marker: { color: '#000000' },

  xaxis: 'x',
  yaxis: 'y',

  index: 0,

  legendgroup: '',
  showlegend: false,

  hoverinfo: 'none'
}

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
}

export const initialScatterTrace: ScatterTrace = {
  type: 'scatter',
  mode: 'markers',

  name: '',

  x: [],
  y: [],

  marker: { color: '#000000' },

  xaxis: 'x',
  yaxis: 'y',

  index: 0,

  legendgroup: '',
  showlegend: false,
};

export interface TestResults {
  plotData: { [propertyName: string]: PlotData };
}

export const initialTestResults: TestResults = {
  plotData: {},
};

export interface TestResultsState extends Loadable, TestResults {}

export const initialTestResultsState: TestResultsState = {
  ...createDefaultLoadable(),
  ...initialTestResults,
};

export interface TrainingResults {
  plotData: { [propertyName: string]: PlotData };
}

export const initialTrainingResults: TrainingResults = {
  plotData: {},
};

export interface TrainingResultsState extends Loadable, TrainingResults {}

export const initialTrainingResultsState: TrainingResultsState = {
  ...createDefaultLoadable(),
  ...initialTrainingResults,
};
