import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { State } from '@core/store';

import { getHasDataSetLoaded } from '@core/store/dataset/dataset.selectors';
import { LoadDataSet } from '@core/store/dataset/dataset.actions';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataSetStoreGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  getFromStoreOrAPI(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(getHasDataSetLoaded, { dataSetId: next.params.dataSetId }),
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(new LoadDataSet(next.params.dataSetId));
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
