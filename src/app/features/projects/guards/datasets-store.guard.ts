import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { State } from '@core/store';

import { catchError, filter, first, switchMap, tap } from 'rxjs/operators';
import { getHasDataSetsLoaded } from '@core/store/datasets/datasets.selectors';
import { LoadDataSets } from '@core/store/datasets/datasets.actions';

@Injectable({
  providedIn: 'root',
})
export class DataSetsStoreGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  getFromStoreOrAPI(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(getHasDataSetsLoaded),
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(
            new LoadDataSets(next.params.projectId, next.params.studyId)
          );
        }
      }),
      filter((loaded) => loaded),
      first()
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
