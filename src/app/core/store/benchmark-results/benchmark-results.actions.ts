import { Action } from '@ngrx/store';
import { BenchmarkResults } from '@core/store/benchmark-results/benchmark-results.interfaces';

export enum BenchmarkResultsActionsTypes {
  Load = '[BENCHMARK-RESULTS] LOAD',
  LoadSuccess = '[BENCHMARK-RESULTS] SUCCESS',
  LoadError = '[BENCHMARK-RESULTS] ERROR',
}

export class LoadBenchmarkResults implements Action {
  readonly type = BenchmarkResultsActionsTypes.Load;

  readonly projectId: string;
  readonly studyId: string;

  constructor(projectId: string, studyId: string) {
    this.projectId = projectId;
    this.studyId = studyId;
  }
}

export class LoadBenchmarkResultsSuccess implements Action {
  readonly type = BenchmarkResultsActionsTypes.LoadSuccess;

  constructor(public payload: BenchmarkResults) {}
}

export class LoadBenchmarkResultsError implements Action {
  readonly type = BenchmarkResultsActionsTypes.LoadError;

  constructor(public error: any) {}
}

export type BenchmarkResultsActions =
  | LoadBenchmarkResults
  | LoadBenchmarkResultsSuccess
  | LoadBenchmarkResultsError;
