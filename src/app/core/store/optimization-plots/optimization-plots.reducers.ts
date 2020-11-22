import {
  OptimizationPlotsActions,
  OptimizationPlotsActionsTypes,
} from '@core/store/optimization-plots/optimization-plots.actions';
import {
  initialOptimizationPlots,
  OptimizationPlots,
} from '@core/store/optimization-plots/optimization-plots.interfaces';
import { createDefaultLoadable } from '@core/loadable/loadable';

export function reducer(
  state: OptimizationPlots = { ...initialOptimizationPlots },
  action: OptimizationPlotsActions
): OptimizationPlots {
  switch (action.type) {
    case OptimizationPlotsActionsTypes.LoadObjectivePlot:
      return {
        ...state,
        objectiveFunction: {
          ...state.objectiveFunction,
          ...createDefaultLoadable(),
          loading: true,
        },
      };
    case OptimizationPlotsActionsTypes.LoadObjectivePlotSuccess:
      return {
        ...state,
        objectiveFunction: {
          ...action.payload,
          ...createDefaultLoadable(),
          success: true,
        },
      };
    case OptimizationPlotsActionsTypes.LoadObjectivePlotError:
      return {
        ...state,
        objectiveFunction: {
          ...state.objectiveFunction,
          ...createDefaultLoadable(),
          error: action.error,
        },
      };
    case OptimizationPlotsActionsTypes.LoadRMSEPlot:
      return {
        ...state,
        rmsePlotCollection: {
          ...state.rmsePlotCollection,
          ...createDefaultLoadable(),
          loading: true,
        },
      };
    case OptimizationPlotsActionsTypes.LoadRMSEPlotSuccess:
      return {
        ...state,
        rmsePlotCollection: {
          ...action.payload,
          ...createDefaultLoadable(),
          success: true,
        },
      };
    case OptimizationPlotsActionsTypes.LoadRMSEPlotError:
      return {
        ...state,
        rmsePlotCollection: {
          ...state.rmsePlotCollection,
          ...createDefaultLoadable(),
          error: action.error,
        },
      };

    default:
      return state;
  }
}
