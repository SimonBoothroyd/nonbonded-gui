import { withLoadable } from '@core/loadable/with-loadable';
import {
  DataSetsActions,
  DataSetsActionsTypes,
} from '@core/store/datasets/datasets.actions';
import {
  DataSetCollectionState,
  initialDataSetCollectionState,
} from '@core/store/datasets/datasets.interfaces';

function baseReducer(
  state: DataSetCollectionState = { ...initialDataSetCollectionState },
  action: DataSetsActions
): DataSetCollectionState {
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

export function reducer(
  state: DataSetCollectionState,
  action: DataSetsActions
): DataSetCollectionState {
  return withLoadable(baseReducer, {
    loadingActionType: DataSetsActionsTypes.Load,
    successActionType: DataSetsActionsTypes.LoadSuccess,
    errorActionType: DataSetsActionsTypes.LoadError,
  })(state, action);
}
