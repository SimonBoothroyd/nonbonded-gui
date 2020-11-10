import { withLoadable } from '@core/loadable/with-loadable';

import {
  initialMoleculeSetState,
  MoleculeSetState,
} from '@core/store/molset/molset.interfaces';
import {
  MoleculeSetActions,
  MoleculeSetActionsTypes,
} from '@core/store/molset/molset.actions';

function baseReducer(
  state: MoleculeSetState = { ...initialMoleculeSetState },
  action: MoleculeSetActions
): MoleculeSetState {
  switch (action.type) {
    case MoleculeSetActionsTypes.LoadSuccess:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function reducer(
  state: MoleculeSetState,
  action: MoleculeSetActions
): MoleculeSetState {
  return withLoadable(baseReducer, {
    loadingActionType: MoleculeSetActionsTypes.Load,
    successActionType: MoleculeSetActionsTypes.LoadSuccess,
    errorActionType: MoleculeSetActionsTypes.LoadError,
  })(state, action);
}
