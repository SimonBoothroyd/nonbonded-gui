import { Action } from '@ngrx/store';
import { ProjectCollection } from '@core/models/projects';

export enum ProjectsActionsTypes {
  Load = '[PROJECTS] LOAD',
  LoadSuccess = '[PROJECTS] SUCCESS',
  LoadError = '[PROJECTS] ERROR',
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionsTypes.Load;
}

export class LoadProjectsSuccess implements Action {
  readonly type = ProjectsActionsTypes.LoadSuccess;
  constructor(public payload: ProjectCollection) {}
}
export class LoadProjectsError implements Action {
  readonly type = ProjectsActionsTypes.LoadError;
  constructor(public error: any) {}
}

export type ProjectsActions = LoadProjects | LoadProjectsSuccess | LoadProjectsError;
