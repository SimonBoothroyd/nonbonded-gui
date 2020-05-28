import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PROJECTS_ENDPOINT } from '@core/endpoints';
import { Project, ProjectCollection } from '@core/models/projects';
import { Projects, ProjectSummary } from '@core/store/projects/projects.interfaces';
import {
  LoadProjects,
  LoadProjectsError,
  LoadProjectsSuccess,
  ProjectsActionsTypes,
} from '@core/store/projects/projects.actions';

@Injectable()
export class ProjectsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  _projectToSummary(project: Project): ProjectSummary {
    let summary = { ...project };
    delete summary.studies;
    return summary;
  }

  _projectsToSummaries(projects: ProjectCollection): Projects {
    const summaries = projects.projects.map(this._projectToSummary);
    return { summaries: summaries };
  }

  @Effect()
  loadProjects = this.actions$.pipe(
    ofType(ProjectsActionsTypes.Load),
    switchMap((action: LoadProjects) => {
      return this.http.get<ProjectCollection>(PROJECTS_ENDPOINT).pipe(
        map(
          (response: ProjectCollection) =>
            new LoadProjectsSuccess(this._projectsToSummaries(response))
        ),
        catchError((error) => of(new LoadProjectsError(error)))
      );
    })
  );
}
