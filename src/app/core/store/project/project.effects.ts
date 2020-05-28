import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PROJECTS_ENDPOINT } from '@core/endpoints';
import { Project } from '@core/models/projects';
import {
  LoadProject,
  LoadProjectError,
  LoadProjectSuccess,
  ProjectActionsTypes,
} from '@core/store/project/project.actions';

@Injectable()
export class ProjectEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  loadProject = this.actions$.pipe(
    ofType(ProjectActionsTypes.Load),
    switchMap((action: LoadProject) => {
      return this.http.get<Project>(`${PROJECTS_ENDPOINT}/${action.projectId}`).pipe(
        map((response: Project) => new LoadProjectSuccess(response)),
        catchError((error) => of(new LoadProjectError(error)))
      );
    })
  );
}
