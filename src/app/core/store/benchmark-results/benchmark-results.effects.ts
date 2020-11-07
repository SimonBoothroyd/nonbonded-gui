import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { PROJECTS_ENDPOINT } from '@core/endpoints';

import { Benchmark, Study } from '@core/models/projects';
import { BenchmarkResult } from '@core/models/results';

import {
  LoadBenchmarkResults,
  LoadBenchmarkResultsError,
  LoadBenchmarkResultsSuccess,
  BenchmarkResultsActionsTypes,
} from '@core/store/benchmark-results/benchmark-results.actions';

@Injectable()
export class BenchmarkResultsEffects {
  @Effect()
  loadBenchmarkResults = this.actions$.pipe(
    ofType(BenchmarkResultsActionsTypes.Load),
    switchMap((action: LoadBenchmarkResults) => {
      return this._get(action.projectId, action.studyId);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}

  _get(projectId: string, studyId: string) {
    return this.http
      .get<Study>(`${PROJECTS_ENDPOINT}/${projectId}/studies/${studyId}`)
      .pipe(
        map((study: Study) => {
          let benchmarkResults$: Observable<BenchmarkResult[]> = forkJoin(
            study.benchmarks.map((benchmark: Benchmark) => {
              return this.http.get<BenchmarkResult>(
                `${PROJECTS_ENDPOINT}/${projectId}/studies/${studyId}/benchmarks/${benchmark.id}/results/`
              );
            })
          );

          return benchmarkResults$.pipe(
            map((results) => {
              return new LoadBenchmarkResultsSuccess({
                projectId: projectId,
                studyId: studyId,
                results: results,
              });
            })
          );
        }),
        mergeMap((o) => o),
        catchError((error) => {
          return of(new LoadBenchmarkResultsError(error));
        })
      );
  }
}
