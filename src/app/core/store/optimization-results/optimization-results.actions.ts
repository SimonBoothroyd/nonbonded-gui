import { Action } from '@ngrx/store';
import { OptimizationResults } from '@core/store/optimization-results/optimization-results.interfaces';

export enum OptimizationResultsActionsTypes {
  Load = '[OPTIMIZATION-RESULTS] LOAD',
  LoadSuccess = '[OPTIMIZATION-RESULTS] SUCCESS',
  LoadError = '[OPTIMIZATION-RESULTS] ERROR',
}

export class LoadOptimizationResults implements Action {
  readonly type = OptimizationResultsActionsTypes.Load;

  readonly projectId: string;
  readonly studyId: string;

  constructor(projectId: string, studyId: string) {
    this.projectId = projectId;
    this.studyId = studyId;
  }
}

export class LoadOptimizationResultsSuccess implements Action {
  readonly type = OptimizationResultsActionsTypes.LoadSuccess;

  constructor(public payload: OptimizationResults) {}
}

export class LoadOptimizationResultsError implements Action {
  readonly type = OptimizationResultsActionsTypes.LoadError;

  constructor(public error: any) {}
}

export type OptimizationResultsActions =
  | LoadOptimizationResults
  | LoadOptimizationResultsSuccess
  | LoadOptimizationResultsError;
