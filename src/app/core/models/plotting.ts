export const defaultColors = [
  'rgb(31, 119, 180)',
  'rgb(255, 127, 14)',
  'rgb(44, 160, 44)',
  'rgb(214, 39, 40)',
  'rgb(148, 103, 189)',
  'rgb(140, 86, 75)',
  'rgb(227, 119, 194)',
  'rgb(127, 127, 127)',
  'rgb(188, 189, 34)',
  'rgb(23, 190, 207)',
];

export interface ErrorBar {
  type: 'data';
  symmetric: boolean;

  array: number[];
  arrayminus: number[];
}

export interface Marker {
  color: string;
}

interface Trace {
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

export interface BarTrace extends Trace {
  type: 'bar';

  error_y: ErrorBar;
  hoverinfo: 'none';
}

export interface ScatterTrace extends Trace{
  type: 'scatter';
  mode: 'markers';
}

const emptyTrace = {
  name: '',

  x: [],
  y: [],

  marker: { color: '#000000' },

  xaxis: 'x',
  yaxis: 'y',

  index: 0,

  legendgroup: '',
  showlegend: false,
}

export const emptyBarTrace: BarTrace = {
  type: 'bar',
  ...emptyTrace,

  error_y: undefined,
  hoverinfo: 'none',
};

export const emptyScatterTrace: ScatterTrace = {
  type: 'scatter',
  mode: 'markers',
  ...emptyTrace,
};
