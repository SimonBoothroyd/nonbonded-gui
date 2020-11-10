import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  LoadMoleculeSets,
  LoadMoleculeSetsError,
  LoadMoleculeSetsSuccess,
  MoleculeSetsActionsTypes,
} from './molsets.actions';

import { MOLECULE_SETS_ENDPOINT } from '@core/endpoints';
import { MoleculeSetCollection } from '@core/models/datasets';

@Injectable()
export class MoleculeSetsEffects {
  @Effect()
  loadMoleculeSet = this.actions$.pipe(
    ofType(MoleculeSetsActionsTypes.Load),
    switchMap((action: LoadMoleculeSets) => {
      return this.http
        .get<MoleculeSetCollection>(`${MOLECULE_SETS_ENDPOINT}/?children=false`)
        .pipe(
          map((response) => new LoadMoleculeSetsSuccess(response)),
          catchError((error) => of(new LoadMoleculeSetsError(error)))
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
