import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { PLOTLY_ENDPOINT, PROJECTS_ENDPOINT } from '@core/endpoints';
import {
  LoadOptimizationResults,
  LoadOptimizationResultsError,
  LoadOptimizationResultsSuccess,
  OptimizationResultsActionsTypes,
} from '@core/store/optimization-results/optimization-results.actions';
import { Study } from '@core/models/projects';
import { Figure } from '@core/models/plotly';

@Injectable()
export class OptimizationResultsEffects {
  @Effect()
  loadOptimizationResults = this.actions$.pipe(
    ofType(OptimizationResultsActionsTypes.Load),
    switchMap((action: LoadOptimizationResults) => {
      return this.http
        .get<Study>(
          `${PROJECTS_ENDPOINT}/${action.projectId}/studies/${action.studyId}`
        )
        .pipe(
          map((study: Study) => {
            const subStudyIds = study.optimizations.map((optimization) => ({
              project_id: action.projectId,
              study_id: action.studyId,
              sub_study_id: optimization.id,
            }));

            let objectiveFunction$ = this.http.post<Figure>(
              `${PLOTLY_ENDPOINT}/optimizations/objective`,
              subStudyIds
            );

            return forkJoin([objectiveFunction$]).pipe(
              map(([objectiveFunction]) => {
                return new LoadOptimizationResultsSuccess({
                  objectiveFunction: objectiveFunction,
                });
              })
            );
          }),
          mergeMap((o) => o),
          catchError((error) => {
            return of(new LoadOptimizationResultsError(error));
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
