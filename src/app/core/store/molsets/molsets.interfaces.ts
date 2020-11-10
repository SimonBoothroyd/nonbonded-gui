import { MoleculeSetCollection } from '@core/models/datasets';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

export const initialMoleculeSets: MoleculeSetCollection = {
  molecule_sets: [],
};

export interface MoleculeSetsState extends Loadable, MoleculeSetCollection {}

export const initialMoleculeSetsState: MoleculeSetsState = {
  ...createDefaultLoadable(),
  ...initialMoleculeSets,
};
