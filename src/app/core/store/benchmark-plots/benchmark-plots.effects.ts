import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PLOTLY_ENDPOINT } from '@core/endpoints';

import { Figure } from '@core/models/plotly';
import {
  BenchmarkPlotsActionsTypes,
  LoadRMSEPlot,
  LoadRMSEPlotError,
  LoadRMSEPlotSuccess,
  LoadScatterPlots,
  LoadScatterPlotsError,
  LoadScatterPlotsSuccess,
} from '@core/store/benchmark-plots/benchmark-plots.actions';
import { ScatterPlotDict } from '@core/store/benchmark-plots/benchmark-plots.interfaces';

@Injectable()
export class BenchmarkPlotsEffects {
  @Effect()
  loadRMSEPlot = this.actions$.pipe(
    ofType(BenchmarkPlotsActionsTypes.LoadRMSEPlot),
    switchMap((action: LoadRMSEPlot) => {
      return this.http
        .get<Figure>(`${PLOTLY_ENDPOINT}/benchmarks/statistics/rmse`, {
          params: { projectid: action.projectId, studyid: action.studyId },
        })
        .pipe(
          map((response: Figure) => new LoadRMSEPlotSuccess(response)),
          catchError((error) => of(new LoadRMSEPlotError(error)))
        );
    })
  );

  @Effect()
  loadScatterPlots = this.actions$.pipe(
    ofType(BenchmarkPlotsActionsTypes.LoadScatterPlots),
    switchMap((action: LoadScatterPlots) => {
      return this.http
        .get<ScatterPlotDict>(`${PLOTLY_ENDPOINT}/benchmarks/scatter`, {
          params: { projectid: action.projectId, studyid: action.studyId },
        })
        .pipe(
          map((response: ScatterPlotDict) => {
            return new LoadScatterPlotsSuccess({ plots: response });
          }),
          catchError((error) => of(new LoadScatterPlotsError(error)))
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
