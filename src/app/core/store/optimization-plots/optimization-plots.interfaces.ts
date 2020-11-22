import { FigureState } from '@shared/components/plotly/plotly.interfaces';
import { Loadable } from '@core/loadable/loadable';
import { Figure } from '@core/models/plotly';

export type RMSEPlotDict = {
  [optimizationId: string]: { [targetId: string]: { [dataType: string]: Figure } };
};

export interface RMSEPlotCollection {
  plots?: RMSEPlotDict;
}

export interface RMSESPlotCollectionState extends RMSEPlotCollection, Loadable {}

export interface OptimizationPlots {
  objectiveFunction?: FigureState;
  rmsePlotCollection?: RMSESPlotCollectionState;
}

export const initialOptimizationPlots: OptimizationPlots = {
  objectiveFunction: null,
  rmsePlotCollection: null,
};
