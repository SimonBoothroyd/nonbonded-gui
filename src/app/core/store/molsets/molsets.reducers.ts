import { withLoadable } from '@core/loadable/with-loadable';
import {
  MoleculeSetsActions,
  MoleculeSetsActionsTypes,
} from '@core/store/molsets/molsets.actions';
import {
  initialMoleculeSetsState,
  MoleculeSetsState,
} from '@core/store/molsets/molsets.interfaces';

function baseReducer(
  state: MoleculeSetsState = { ...initialMoleculeSetsState },
  action: MoleculeSetsActions
): MoleculeSetsState {
  switch (action.type) {
    case MoleculeSetsActionsTypes.LoadSuccess:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function reducer(
  state: MoleculeSetsState,
  action: MoleculeSetsActions
): MoleculeSetsState {
  return withLoadable(baseReducer, {
    loadingActionType: MoleculeSetsActionsTypes.Load,
    successActionType: MoleculeSetsActionsTypes.LoadSuccess,
    errorActionType: MoleculeSetsActionsTypes.LoadError,
  })(state, action);
}
