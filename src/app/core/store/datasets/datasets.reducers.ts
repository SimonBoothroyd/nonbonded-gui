import { withLoadable } from '@core/loadable/with-loadable';
import {
  DataSetsActions,
  DataSetsActionsTypes,
} from '@core/store/datasets/datasets.actions';
import {
  DataSetsState,
  initialDataSetsState,
} from '@core/store/datasets/datasets.interfaces';

function baseReducer(
  state: DataSetsState = { ...initialDataSetsState },
  action: DataSetsActions
): DataSetsState {
  switch (action.type) {
    case DataSetsActionsTypes.LoadSuccess:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function reducer(state: DataSetsState, action: DataSetsActions): DataSetsState {
  return withLoadable(baseReducer, {
    loadingActionType: DataSetsActionsTypes.Load,
    successActionType: DataSetsActionsTypes.LoadSuccess,
    errorActionType: DataSetsActionsTypes.LoadError,
  })(state, action);
}
