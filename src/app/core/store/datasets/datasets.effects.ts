import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  DataSetsActionsTypes,
  LoadDataSets,
  LoadDataSetsError,
  LoadDataSetsSuccess,
} from './datasets.actions';

import { DATA_SETS_ENDPOINT } from '@core/endpoints';
import { DataSetCollection } from '@core/models/datasets';

@Injectable()
export class DataSetsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  loadDataSet = this.actions$.pipe(
    ofType(DataSetsActionsTypes.Load),
    switchMap((action: LoadDataSets) => {
      return this.http
        .get<DataSetCollection>(`${DATA_SETS_ENDPOINT}/?children=false`)
        .pipe(
          map((response) => new LoadDataSetsSuccess(response)),
          catchError((error) => of(new LoadDataSetsError(error)))
        );
    })
  );
}
