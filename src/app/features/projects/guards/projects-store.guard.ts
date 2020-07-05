import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { State } from '@core/store';

import { getHasProjectsLoaded } from '@core/store/projects/projects.selectors';
import { LoadProjects } from '@core/store/projects/projects.actions';
import { catchError, filter, first, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectsStoreGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  getFromStoreOrAPI(): Observable<boolean> {
    return this.store.pipe(
      select(getHasProjectsLoaded),
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(new LoadProjects());
        }
      })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // return our Observable stream from above
    return this.getFromStoreOrAPI().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
