import { Action } from '@ngrx/store';
import { Figure } from '@core/models/plotly';
import { RMSEPlotCollection } from '@core/store/optimization-plots/optimization-plots.interfaces';

export enum OptimizationPlotsActionsTypes {
  LoadObjectivePlot = '[OPTIMIZATION-OBJECTIVE] LOAD',
  LoadObjectivePlotSuccess = '[OPTIMIZATION-OBJECTIVE] SUCCESS',
  LoadObjectivePlotError = '[OPTIMIZATION-OBJECTIVE] ERROR',
  LoadRMSEPlot = '[OPTIMIZATION-RMSE] LOAD',
  LoadRMSEPlotSuccess = '[OPTIMIZATION-RMSE] SUCCESS',
  LoadRMSEPlotError = '[OPTIMIZATION-RMSE] ERROR',
}

class LoadOptimizationPlots {
  readonly projectId: string;
  readonly studyId: string;

  constructor(projectId: string, studyId: string) {
    this.projectId = projectId;
    this.studyId = studyId;
  }
}

export class LoadObjectivePlot extends LoadOptimizationPlots implements Action {
  readonly type = OptimizationPlotsActionsTypes.LoadObjectivePlot;
}

export class LoadObjectivePlotSuccess implements Action {
  readonly type = OptimizationPlotsActionsTypes.LoadObjectivePlotSuccess;

  constructor(public payload: Figure) {}
}

export class LoadObjectivePlotError implements Action {
  readonly type = OptimizationPlotsActionsTypes.LoadObjectivePlotError;

  constructor(public error: any) {}
}

export class LoadRMSEPlot extends LoadOptimizationPlots implements Action {
  readonly type = OptimizationPlotsActionsTypes.LoadRMSEPlot;
}

export class LoadRMSEPlotSuccess implements Action {
  readonly type = OptimizationPlotsActionsTypes.LoadRMSEPlotSuccess;

  constructor(public payload: RMSEPlotCollection) {}
}

export class LoadRMSEPlotError implements Action {
  readonly type = OptimizationPlotsActionsTypes.LoadRMSEPlotError;

  constructor(public error: any) {}
}

export type OptimizationPlotsActions =
  | LoadObjectivePlot
  | LoadObjectivePlotSuccess
  | LoadObjectivePlotError
  | LoadRMSEPlot
  | LoadRMSEPlotSuccess
  | LoadRMSEPlotError;
