import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  LoadDataSetsError,
  LoadDataSetsSuccess,
  DataSetsActionsTypes,
  LoadDataSets,
} from './datasets.actions';

import { DATA_SETS_ENDPOINT } from '@core/endpoints';
import { DataSetCollection } from '@core/models/datasets';

@Injectable()
export class DataSetEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  loadDataSet = this.actions$.pipe(
    ofType(DataSetsActionsTypes.Load),
    switchMap((action: LoadDataSets) => {
      const params = new HttpParams()
        .set('projectId', action.projectId)
        .set('studyId', action.studyId);

      return this.http
        .get<DataSetCollection>(DATA_SETS_ENDPOINT, { params: params })
        .pipe(
          map((response) => new LoadDataSetsSuccess(response)),
          catchError((error) => of(new LoadDataSetsError(error)))
        );
    })
  );
}
