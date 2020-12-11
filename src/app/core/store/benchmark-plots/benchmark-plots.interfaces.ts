import { Loadable } from '@core/loadable/loadable';
import { Figure } from '@core/models/plotly';
import { FigureState } from '@shared/components/plotly/plotly.interfaces';

export type ScatterPlotDict = { [dataType: string]: Figure };

export interface ScatterPlotCollection {
  plots?: ScatterPlotDict;
}

export interface ScatterPlotCollectionState extends ScatterPlotCollection, Loadable {}

export interface BenchmarkPlots {
  overallRMSE?: FigureState;
  scatterPlotCollection?: ScatterPlotCollectionState;
}

export const initialBenchmarkPlots: BenchmarkPlots = {
  overallRMSE: null,
  scatterPlotCollection: null,
};
