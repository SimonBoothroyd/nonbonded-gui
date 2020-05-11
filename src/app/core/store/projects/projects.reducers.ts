import {
  ProjectsActions,
  ProjectsActionsTypes,
} from '@core/store/projects/projects.actions';
import { withLoadable } from '@core/loadable/with-loadable';
import {
  initialProjectCollectionState,
  ProjectCollectionState,
} from '@core/store/projects/projects.interfaces';

function baseReducer(
  state: ProjectCollectionState = { ...initialProjectCollectionState },
  action: ProjectsActions
): ProjectCollectionState {
  switch (action.type) {
    case ProjectsActionsTypes.LoadSuccess:
      return {
        ...state,
        projects: action.payload.projects,
      };

    default:
      return state;
  }
}

export function reducer(
  state: ProjectCollectionState,
  action: ProjectsActions
): ProjectCollectionState {
  return withLoadable(baseReducer, {
    loadingActionType: ProjectsActionsTypes.Load,
    successActionType: ProjectsActionsTypes.LoadSuccess,
    errorActionType: ProjectsActionsTypes.LoadError,
  })(state, action);
}
