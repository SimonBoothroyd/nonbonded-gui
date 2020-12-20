import { Action } from '@ngrx/store';
import { DataSet } from '@core/store/dataset/dataset.interfaces';

export enum DataSetActionsTypes {
  Load = '[DATASET] LOAD',
  LoadSuccess = '[DATASET] SUCCESS',
  LoadError = '[DATASET] ERROR',
}

export class LoadDataSet implements Action {
  readonly type = DataSetActionsTypes.Load;
  readonly dataSetId: string;

  constructor(dataSetId: string) {
    this.dataSetId = dataSetId;
  }
}

export class LoadDataSetSuccess implements Action {
  readonly type = DataSetActionsTypes.LoadSuccess;

  constructor(public payload: DataSet) {}
}

export class LoadDataSetError implements Action {
  readonly type = DataSetActionsTypes.LoadError;

  constructor(public error: any) {}
}

export type DataSetActions = LoadDataSet | LoadDataSetSuccess | LoadDataSetError;
