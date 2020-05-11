import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  LoadProjectsError,
  LoadProjectsSuccess,
  ProjectsActionsTypes,
} from './projects.actions';

import { PROJECTS_ENDPOINT } from '@core/endpoints';
import { ProjectCollection } from '@core/models/projects';

@Injectable()
export class ProjectsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  loadProjects = this.actions$.pipe(
    ofType(ProjectsActionsTypes.Load),
    switchMap((action) => {
      return this.http.get<ProjectCollection>(PROJECTS_ENDPOINT).pipe(
        map((response: ProjectCollection) => new LoadProjectsSuccess(response)),
        catchError((error) => of(new LoadProjectsError(error)))
      );
    })
  );
}
