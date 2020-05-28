import { Action } from '@ngrx/store';
import { Project } from '@core/models/projects';

export enum ProjectActionsTypes {
  Load = '[PROJECT] LOAD',
  LoadSuccess = '[PROJECT] SUCCESS',
  LoadError = '[PROJECT] ERROR',
}

export class LoadProject implements Action {
  readonly type = ProjectActionsTypes.Load;
  readonly projectId: string;

  constructor(projectId: string) {
    this.projectId = projectId;
  }
}

export class LoadProjectSuccess implements Action {
  readonly type = ProjectActionsTypes.LoadSuccess;
  constructor(public payload: Project) {}
}
export class LoadProjectError implements Action {
  readonly type = ProjectActionsTypes.LoadError;
  constructor(public error: any) {}
}

export type ProjectActions = LoadProject | LoadProjectSuccess | LoadProjectError;
