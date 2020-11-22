import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PLOTLY_ENDPOINT } from '@core/endpoints';

import { Figure } from '@core/models/plotly';
import {
  LoadObjectivePlot,
  LoadObjectivePlotError,
  LoadObjectivePlotSuccess,
  LoadRMSEPlot,
  LoadRMSEPlotSuccess,
  OptimizationPlotsActionsTypes,
} from '@core/store/optimization-plots/optimization-plots.actions';
import { RMSEPlotDict } from '@core/store/optimization-plots/optimization-plots.interfaces';

@Injectable()
export class OptimizationPlotsEffects {
  @Effect()
  loadObjectivePlot = this.actions$.pipe(
    ofType(OptimizationPlotsActionsTypes.LoadObjectivePlot),
    switchMap((action: LoadObjectivePlot) => {
      return this.http
        .get<Figure>(`${PLOTLY_ENDPOINT}/optimizations/objective`, {
          params: { projectid: action.projectId, studyid: action.studyId },
        })
        .pipe(
          map((response: Figure) => new LoadObjectivePlotSuccess(response)),
          catchError((error) => of(new LoadObjectivePlotError(error)))
        );
    })
  );

  @Effect()
  loadRMSEPlots = this.actions$.pipe(
    ofType(OptimizationPlotsActionsTypes.LoadRMSEPlot),
    switchMap((action: LoadRMSEPlot) => {
      return this.http
        .get<RMSEPlotDict>(`${PLOTLY_ENDPOINT}/optimizations/rmse`, {
          params: { projectid: action.projectId, studyid: action.studyId },
        })
        .pipe(
          map((response: RMSEPlotDict) => {
            return new LoadRMSEPlotSuccess({ plots: response });
          }),
          catchError((error) => of(new LoadRMSEPlotSuccess(error)))
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
