import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MoleculeSetState } from './molset.interfaces';

export const selectMoleculeSetState = createFeatureSelector<MoleculeSetState>('molset');
export const getHasMoleculeSetLoaded = createSelector(
  selectMoleculeSetState,
  (state: MoleculeSetState, props): boolean => {
    if (state.id != props.moleculeSetId) return false;
    return state.loading || state.success || state.error != null;
  }
);
