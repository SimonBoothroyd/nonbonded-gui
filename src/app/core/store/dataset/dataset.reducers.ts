import { withLoadable } from '@core/loadable/with-loadable';

import {
  DataSetState,
  initialDataSetState,
} from '@core/store/dataset/dataset.interfaces';
import {
  DataSetActions,
  DataSetActionsTypes,
} from '@core/store/dataset/dataset.actions';

function baseReducer(
  state: DataSetState = { ...initialDataSetState },
  action: DataSetActions
): DataSetState {
  switch (action.type) {
    case DataSetActionsTypes.LoadSuccess:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function reducer(state: DataSetState, action: DataSetActions): DataSetState {
  return withLoadable(baseReducer, {
    loadingActionType: DataSetActionsTypes.Load,
    successActionType: DataSetActionsTypes.LoadSuccess,
    errorActionType: DataSetActionsTypes.LoadError,
  })(state, action);
}
