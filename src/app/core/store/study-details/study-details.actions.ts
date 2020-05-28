import { Action } from '@ngrx/store';
import { StudyDetails } from '@core/store/study-details/study-details.interfaces';

export enum StudyDetailsActionsTypes {
  Load = '[STUDY] LOAD',
  LoadSuccess = '[STUDY] SUCCESS',
  LoadError = '[STUDY] ERROR',
}

export class LoadStudyDetails implements Action {
  readonly type = StudyDetailsActionsTypes.Load;

  readonly projectId: string;
  readonly studyId: string;

  constructor(projectId: string, studyId: string) {
    this.projectId = projectId;
    this.studyId = studyId;
  }
}

export class LoadStudyDetailsSuccess implements Action {
  readonly type = StudyDetailsActionsTypes.LoadSuccess;
  constructor(public payload: StudyDetails) {}
}
export class LoadStudyDetailsError implements Action {
  readonly type = StudyDetailsActionsTypes.LoadError;
  constructor(public error: any) {}
}

export type StudyDetailsActions =
  | LoadStudyDetails
  | LoadStudyDetailsSuccess
  | LoadStudyDetailsError;
