import { Action } from '@ngrx/store';
import { MoleculeSet } from '@core/models/datasets';

export enum MoleculeSetActionsTypes {
  Load = '[MOLSET] LOAD',
  LoadSuccess = '[MOLSET] SUCCESS',
  LoadError = '[MOLSET] ERROR',
}

export class LoadMoleculeSet implements Action {
  readonly type = MoleculeSetActionsTypes.Load;
  readonly moleculeSetId: string;

  constructor(moleculeSetId: string) {
    this.moleculeSetId = moleculeSetId;
  }
}

export class LoadMoleculeSetSuccess implements Action {
  readonly type = MoleculeSetActionsTypes.LoadSuccess;

  constructor(public payload: MoleculeSet) {}
}

export class LoadMoleculeSetError implements Action {
  readonly type = MoleculeSetActionsTypes.LoadError;

  constructor(public error: any) {}
}

export type MoleculeSetActions =
  | LoadMoleculeSet
  | LoadMoleculeSetSuccess
  | LoadMoleculeSetError;
