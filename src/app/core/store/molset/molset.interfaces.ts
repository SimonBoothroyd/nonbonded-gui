import { MoleculeSet } from '@core/models/datasets';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

export const initialMoleculeSet: MoleculeSet = {
  id: '',
  description: '',
  authors: [],
  entries: [],
};

export interface MoleculeSetState extends Loadable, MoleculeSet {}

export const initialMoleculeSetState: MoleculeSetState = {
  ...createDefaultLoadable(),
  ...initialMoleculeSet,
};
