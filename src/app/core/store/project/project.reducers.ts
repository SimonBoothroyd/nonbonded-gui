import { withLoadable } from '@core/loadable/with-loadable';

import {
  initialProjectState,
  ProjectState,
} from '@core/store/project/project.interfaces';
import {
  ProjectActions,
  ProjectActionsTypes,
} from '@core/store/project/project.actions';

function baseReducer(
  state: ProjectState = { ...initialProjectState },
  action: ProjectActions
): ProjectState {
  switch (action.type) {
    case ProjectActionsTypes.LoadSuccess:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function reducer(state: ProjectState, action: ProjectActions): ProjectState {
  return withLoadable(baseReducer, {
    loadingActionType: ProjectActionsTypes.Load,
    successActionType: ProjectActionsTypes.LoadSuccess,
    errorActionType: ProjectActionsTypes.LoadError,
  })(state, action);
}
