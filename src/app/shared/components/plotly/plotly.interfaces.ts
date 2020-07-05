import { Plotly } from 'angular-plotly.js/src/app/shared/plotly.interface';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

export interface PlotData extends Loadable{
  subplotTitles: string[]
  traces: Plotly.Data[]
}

export const initialPlotData: PlotData = {
  ...createDefaultLoadable(),
  subplotTitles: [],
  traces: []
};
