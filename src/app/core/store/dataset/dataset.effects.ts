import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { DATA_SETS_ENDPOINT } from '@core/endpoints';
import { DataSet } from '@core/models/datasets';
import {
  DataSetActionsTypes,
  LoadDataSet,
  LoadDataSetError,
  LoadDataSetSuccess,
} from '@core/store/dataset/dataset.actions';

@Injectable()
export class DataSetEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  loadDataSet = this.actions$.pipe(
    ofType(DataSetActionsTypes.Load),
    switchMap((action: LoadDataSet) => {
      return this.http.get<DataSet>(`${DATA_SETS_ENDPOINT}/${action.dataSetId}`).pipe(
        map((response: DataSet) => new LoadDataSetSuccess(response)),
        catchError((error) => of(new LoadDataSetError(error)))
      );
    })
  );
}
