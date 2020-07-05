import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { PROJECTS_ENDPOINT } from '@core/endpoints';

import { Benchmark, Optimization, Study } from '@core/models/projects';
import { OptimizationResult } from '@core/models/optimization';
import { BenchmarkResult } from '@core/models/benchmark';

import { DataSetCollection } from '@core/models/datasets';

import {
  LoadStudyDetails,
  LoadStudyDetailsError,
  LoadStudyDetailsSuccess,
  StudyDetailsActionsTypes,
} from '@core/store/study-details/study-details.actions';

@Injectable()
export class StudyDetailsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  _get(projectId: string, studyId: string) {
    return this.http
      .get<Study>(`${PROJECTS_ENDPOINT}/${projectId}/studies/${studyId}`)
      .pipe(
        map((study: Study) => {
          let optimizationResults$: Observable<OptimizationResult[]>;

          if (study.optimizations.length === 0) {
            optimizationResults$ = of([]);
          } else {
            optimizationResults$ = forkJoin(
              study.optimizations.map((optimization: Optimization) => {
                return this.http.get<OptimizationResult>(
                  `${PROJECTS_ENDPOINT}/${projectId}/studies/${studyId}/optimizations/${optimization.id}/results/`
                );
              })
            );
          }

          let benchmarkResults$: Observable<BenchmarkResult[]>;

          if (study.benchmarks.length === 0) {
            benchmarkResults$ = of([]);
          } else {
            benchmarkResults$ = forkJoin(
              study.benchmarks.map((benchmark: Benchmark) => {
                return this.http.get<BenchmarkResult>(
                  `${PROJECTS_ENDPOINT}/${projectId}/studies/${studyId}/benchmarks/${benchmark.id}/results/`
                );
              })
            );
          }

          let dataSets$ = this.http.get<DataSetCollection>(
            `${PROJECTS_ENDPOINT}/${projectId}/studies/${studyId}/datasets/`
          );

          return forkJoin([optimizationResults$, benchmarkResults$, dataSets$]).pipe(
            map(([optimizationResults, benchmarkResults, dataSets]) => {
              return new LoadStudyDetailsSuccess({
                projectId: projectId,
                studyId: studyId,
                optimizationResults: optimizationResults,
                benchmarkResults: benchmarkResults,
                dataSets: dataSets.data_sets,
              });
            })
          );
        }),
        mergeMap((o) => o),
        catchError((error) => {
          return of(new LoadStudyDetailsError(error));
        })
      );
  }

  @Effect()
  loadStudyDetails = this.actions$.pipe(
    ofType(StudyDetailsActionsTypes.Load),
    switchMap((action: LoadStudyDetails) => {
      return this._get(action.projectId, action.studyId);
    })
  );
}