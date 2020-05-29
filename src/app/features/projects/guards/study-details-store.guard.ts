import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { catchError, filter, first, switchMap, tap } from 'rxjs/operators';

import { State } from '@core/store';

import { LoadStudyDetails } from '@core/store/study-details/study-details.actions';
import { getHasStudyDetailsLoaded } from '@core/store/study-details/study-details.selectors';

@Injectable({
  providedIn: 'root',
})
export class StudyDetailsStoreGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  getFromStoreOrAPI(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(getHasStudyDetailsLoaded, {
        projectId: next.params.projectId,
        studyId: next.params.studyId,
      }),
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(
            new LoadStudyDetails(next.params.projectId, next.params.studyId)
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
