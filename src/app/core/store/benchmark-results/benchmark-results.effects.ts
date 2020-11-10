import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { PLOTLY_ENDPOINT, PROJECTS_ENDPOINT } from '@core/endpoints';
import {
  BenchmarkResultsActionsTypes,
  LoadBenchmarkResults,
  LoadBenchmarkResultsError,
  LoadBenchmarkResultsSuccess,
} from '@core/store/benchmark-results/benchmark-results.actions';
import { Study } from '@core/models/projects';
import { Figure } from '@core/models/plotly';

@Injectable()
export class BenchmarkResultsEffects {
  @Effect()
  loadBenchmarkResults = this.actions$.pipe(
    ofType(BenchmarkResultsActionsTypes.Load),
    switchMap((action: LoadBenchmarkResults) => {
      return this.http
        .get<Study>(
          `${PROJECTS_ENDPOINT}/${action.projectId}/studies/${action.studyId}`
        )
        .pipe(
          map((study: Study) => {
            const subStudyIds = study.benchmarks.map((benchmark) => ({
              project_id: action.projectId,
              study_id: action.studyId,
              sub_study_id: benchmark.id,
            }));

            let overallRMSE$ = this.http.post<Figure>(
              `${PLOTLY_ENDPOINT}/benchmarks/statistics/rmse`,
              subStudyIds
            );
            let scatter$ = this.http.post<{ [key: string]: Figure }>(
              `${PLOTLY_ENDPOINT}/benchmarks/scatter`,
              subStudyIds
            );

            return forkJoin([overallRMSE$, scatter$]).pipe(
              map(([overallRMSE, scatter]) => {
                return new LoadBenchmarkResultsSuccess({
                  overallRMSE: overallRMSE,
                  scatter: scatter,
                });
              })
            );
          }),
          mergeMap((o) => o),
          catchError((error) => {
            return of(new LoadBenchmarkResultsError(error));
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
