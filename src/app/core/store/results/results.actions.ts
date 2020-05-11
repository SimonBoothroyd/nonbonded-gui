import { Action } from '@ngrx/store';
import {
  BenchmarkResultsCollection,
  OptimizationResultCollection,
} from '@core/models/results';

export enum BenchmarksActionsTypes {
  Load = '[BENCHMARKS] LOAD',
  LoadSuccess = '[BENCHMARKS] SUCCESS',
  LoadError = '[BENCHMARKS] ERROR',
}
export enum OptimizationsActionsTypes {
  Load = '[OPTIMIZATION] LOAD',
  LoadSuccess = '[OPTIMIZATION] SUCCESS',
  LoadError = '[OPTIMIZATION] ERROR',
}

export class LoadBenchmarks implements Action {
  readonly type = BenchmarksActionsTypes.Load;

  readonly projectId: string;
  readonly studyId: string;

  constructor(projectId: string, studyId: string) {
    this.projectId = projectId;
    this.studyId = studyId;
  }
}
export class LoadOptimizations implements Action {
  readonly type = OptimizationsActionsTypes.Load;

  readonly projectId: string;
  readonly studyId: string;

  constructor(projectId: string, studyId: string) {
    this.projectId = projectId;
    this.studyId = studyId;
  }
}

export class LoadBenchmarksSuccess implements Action {
  readonly type = BenchmarksActionsTypes.LoadSuccess;
  constructor(public payload: BenchmarkResultsCollection) {}
}
export class LoadOptimizationsSuccess implements Action {
  readonly type = OptimizationsActionsTypes.LoadSuccess;
  constructor(public payload: OptimizationResultCollection) {}
}

export class LoadBenchmarksError implements Action {
  readonly type = BenchmarksActionsTypes.LoadError;
  constructor(public error: any) {}
}
export class LoadOptimizationsError implements Action {
  readonly type = OptimizationsActionsTypes.LoadError;
  constructor(public error: any) {}
}

export type BenchmarksActions =
  | LoadBenchmarks
  | LoadBenchmarksSuccess
  | LoadBenchmarksError;
export type OptimizationsActions =
  | LoadOptimizations
  | LoadOptimizationsSuccess
  | LoadOptimizationsError;
