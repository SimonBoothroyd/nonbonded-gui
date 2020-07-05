import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { State } from '@core/store';

import { getHasProjectLoaded } from '@core/store/project/project.selectors';
import { LoadProject } from '@core/store/project/project.actions';
import { catchError, filter, first, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectStoreGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  getFromStoreOrAPI(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(getHasProjectLoaded, { projectId: next.params.projectId }),
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(new LoadProject(next.params.projectId));
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
