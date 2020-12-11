import {
  BenchmarkPlotsActions,
  BenchmarkPlotsActionsTypes,
} from '@core/store/benchmark-plots/benchmark-plots.actions';
import {
  BenchmarkPlots,
  initialBenchmarkPlots,
} from '@core/store/benchmark-plots/benchmark-plots.interfaces';
import { createDefaultLoadable } from '@core/loadable/loadable';

export function reducer(
  state: BenchmarkPlots = { ...initialBenchmarkPlots },
  action: BenchmarkPlotsActions
): BenchmarkPlots {
  switch (action.type) {
    case BenchmarkPlotsActionsTypes.LoadRMSEPlot:
      return {
        ...state,
        overallRMSE: {
          ...state.overallRMSE,
          ...createDefaultLoadable(),
          loading: true,
        },
      };
    case BenchmarkPlotsActionsTypes.LoadRMSEPlotSuccess:
      return {
        ...state,
        overallRMSE: {
          ...action.payload,
          ...createDefaultLoadable(),
          success: true,
        },
      };
    case BenchmarkPlotsActionsTypes.LoadRMSEPlotError:
      return {
        ...state,
        overallRMSE: {
          ...state.overallRMSE,
          ...createDefaultLoadable(),
          error: action.error,
        },
      };
    case BenchmarkPlotsActionsTypes.LoadScatterPlots:
      return {
        ...state,
        scatterPlotCollection: {
          ...state.scatterPlotCollection,
          ...createDefaultLoadable(),
          loading: true,
        },
      };
    case BenchmarkPlotsActionsTypes.LoadScatterPlotsSuccess:
      return {
        ...state,
        scatterPlotCollection: {
          ...action.payload,
          ...createDefaultLoadable(),
          success: true,
        },
      };
    case BenchmarkPlotsActionsTypes.LoadScatterPlotsError:
      return {
        ...state,
        scatterPlotCollection: {
          ...state.scatterPlotCollection,
          ...createDefaultLoadable(),
          error: action.error,
        },
      };

    default:
      return state;
  }
}
