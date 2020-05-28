import { withLoadable } from '@core/loadable/with-loadable';
import {
  initialProjectsState,
  ProjectsState,
} from '@core/store/projects/projects.interfaces';
import {
  ProjectsActions,
  ProjectsActionsTypes,
} from '@core/store/projects/projects.actions';

function baseReducer(
  state: ProjectsState = { ...initialProjectsState },
  action: ProjectsActions
): ProjectsState {
  switch (action.type) {
    case ProjectsActionsTypes.LoadSuccess:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function reducer(state: ProjectsState, action: ProjectsActions): ProjectsState {
  return withLoadable(baseReducer, {
    loadingActionType: ProjectsActionsTypes.Load,
    successActionType: ProjectsActionsTypes.LoadSuccess,
    errorActionType: ProjectsActionsTypes.LoadError,
  })(state, action);
}
