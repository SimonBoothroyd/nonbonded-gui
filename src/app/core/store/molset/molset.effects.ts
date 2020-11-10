import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MOLECULE_SETS_ENDPOINT } from '@core/endpoints';
import { MoleculeSet } from '@core/models/datasets';
import {
  LoadMoleculeSet,
  LoadMoleculeSetError,
  LoadMoleculeSetSuccess,
  MoleculeSetActionsTypes,
} from '@core/store/molset/molset.actions';

@Injectable()
export class MoleculeSetEffects {
  @Effect()
  loadMoleculeSet = this.actions$.pipe(
    ofType(MoleculeSetActionsTypes.Load),
    switchMap((action: LoadMoleculeSet) => {
      return this.http
        .get<MoleculeSet>(`${MOLECULE_SETS_ENDPOINT}/${action.moleculeSetId}`)
        .pipe(
          map((response: MoleculeSet) => new LoadMoleculeSetSuccess(response)),
          catchError((error) => of(new LoadMoleculeSetError(error)))
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
