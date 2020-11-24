import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { State } from '@core/store';

import { getHasMoleculeSetLoaded } from '@core/store/molset/molset.selectors';
import { LoadMoleculeSet } from '@core/store/molset/molset.actions';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoleculeSetStoreGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  getFromStoreOrAPI(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(getHasMoleculeSetLoaded, { moleculeSetId: next.params.moleculeSetId }),
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(new LoadMoleculeSet(next.params.moleculeSetId));
        }
      })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // return our Observable stream from above
    return this.getFromStoreOrAPI(next).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
