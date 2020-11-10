import { Action } from '@ngrx/store';
import { MoleculeSetCollection } from '@core/models/datasets';

export enum MoleculeSetsActionsTypes {
  Load = '[MOLSETS] LOAD',
  LoadSuccess = '[MOLSETS] SUCCESS',
  LoadError = '[MOLSETS] ERROR',
}

export class LoadMoleculeSets implements Action {
  readonly type = MoleculeSetsActionsTypes.Load;
}

export class LoadMoleculeSetsSuccess implements Action {
  readonly type = MoleculeSetsActionsTypes.LoadSuccess;

  constructor(public payload: MoleculeSetCollection) {}
}

export class LoadMoleculeSetsError implements Action {
  readonly type = MoleculeSetsActionsTypes.LoadError;

  constructor(public error: any) {}
}

export type MoleculeSetsActions =
  | LoadMoleculeSets
  | LoadMoleculeSetsSuccess
  | LoadMoleculeSetsError;
