import { Action } from '@ngrx/store';
import { Figure } from '@core/models/plotly';
import { ScatterPlotCollection } from '@core/store/benchmark-plots/benchmark-plots.interfaces';

export enum BenchmarkPlotsActionsTypes {
  LoadRMSEPlot = '[BENCHMARK-RMSE] LOAD',
  LoadRMSEPlotSuccess = '[BENCHMARK-RMSE] SUCCESS',
  LoadRMSEPlotError = '[BENCHMARK-RMSE] ERROR',
  LoadScatterPlots = '[BENCHMARK-SCATTER] LOAD',
  LoadScatterPlotsSuccess = '[BENCHMARK-SCATTER] SUCCESS',
  LoadScatterPlotsError = '[BENCHMARK-SCATTER] ERROR',
}

export class LoadBenchmarkPlots {
  readonly projectId: string;
  readonly studyId: string;

  constructor(projectId: string, studyId: string) {
    this.projectId = projectId;
    this.studyId = studyId;
  }
}

export class LoadRMSEPlot extends LoadBenchmarkPlots implements Action {
  readonly type = BenchmarkPlotsActionsTypes.LoadRMSEPlot;
}

export class LoadRMSEPlotSuccess implements Action {
  readonly type = BenchmarkPlotsActionsTypes.LoadRMSEPlotSuccess;

  constructor(public payload: Figure) {}
}

export class LoadRMSEPlotError implements Action {
  readonly type = BenchmarkPlotsActionsTypes.LoadRMSEPlotError;

  constructor(public error: any) {}
}

export class LoadScatterPlots extends LoadBenchmarkPlots implements Action {
  readonly type = BenchmarkPlotsActionsTypes.LoadScatterPlots;
}

export class LoadScatterPlotsSuccess implements Action {
  readonly type = BenchmarkPlotsActionsTypes.LoadScatterPlotsSuccess;

  constructor(public payload: ScatterPlotCollection) {}
}

export class LoadScatterPlotsError implements Action {
  readonly type = BenchmarkPlotsActionsTypes.LoadScatterPlotsError;

  constructor(public error: any) {}
}

export type BenchmarkPlotsActions =
  | LoadRMSEPlot
  | LoadRMSEPlotSuccess
  | LoadRMSEPlotError
  | LoadScatterPlots
  | LoadScatterPlotsSuccess
  | LoadScatterPlotsError;
