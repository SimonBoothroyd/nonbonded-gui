import { Action } from '@ngrx/store';
import { DataSetCollection } from '@core/models/datasets';

export enum DataSetsActionsTypes {
  Load = '[DATASETS] LOAD',
  LoadSuccess = '[DATASETS] SUCCESS',
  LoadError = '[DATASETS] ERROR',
}

export class LoadDataSets implements Action {
  readonly type = DataSetsActionsTypes.Load;

  readonly projectId: string;
  readonly studyId: string;

  constructor(projectId: string, studyId: string) {
    this.projectId = projectId;
    this.studyId = studyId;
  }
}

export class LoadDataSetsSuccess implements Action {
  readonly type = DataSetsActionsTypes.LoadSuccess;
  constructor(public payload: DataSetCollection) {}
}
export class LoadDataSetsError implements Action {
  readonly type = DataSetsActionsTypes.LoadError;
  constructor(public error: any) {}
}

export type DataSetsActions = LoadDataSets | LoadDataSetsSuccess | LoadDataSetsError;
