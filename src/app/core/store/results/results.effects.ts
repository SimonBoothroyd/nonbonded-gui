import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  BenchmarksActionsTypes,
  LoadBenchmarks,
  LoadBenchmarksError,
  LoadBenchmarksSuccess,
  LoadOptimizations,
  LoadOptimizationsError,
  LoadOptimizationsSuccess,
  OptimizationsActionsTypes,
} from '@core/store/results/results.actions';

import {
  BenchmarkResultsCollection,
  OptimizationResultCollection,
} from '@core/models/results';

import { BENCHMARKS_ENDPOINT, OPTIMIZATIONS_ENDPOINT } from '@core/endpoints';

@Injectable()
export class BenchmarksEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  loadBenchmarks = this.actions$.pipe(
    ofType(BenchmarksActionsTypes.Load),
    switchMap((action: LoadBenchmarks) => {
      const params = new HttpParams()
        .set('projectId', action.projectId)
        .set('studyId', action.studyId);

      return this.http
        .get<BenchmarkResultsCollection>(BENCHMARKS_ENDPOINT, { params: params })
        .pipe(
          map((response) => new LoadBenchmarksSuccess(response)),
          catchError((error) => of(new LoadBenchmarksError(error)))
        );
    })
  );
}

@Injectable()
export class OptimizationsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  loadOptimizations = this.actions$.pipe(
    ofType(OptimizationsActionsTypes.Load),
    switchMap((action: LoadOptimizations) => {
      const params = new HttpParams()
        .set('projectId', action.projectId)
        .set('studyId', action.studyId);

      return this.http
        .get<OptimizationResultCollection>(OPTIMIZATIONS_ENDPOINT, { params: params })
        .pipe(
          map((response) => new LoadOptimizationsSuccess(response)),
          catchError((error) => of(new LoadOptimizationsError(error)))
        );
    })
  );
}
