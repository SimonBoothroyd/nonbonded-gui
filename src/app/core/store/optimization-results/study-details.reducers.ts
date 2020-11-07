import { withLoadable } from '@core/loadable/with-loadable';
import {
  initialStudyDetailsState,
  StudyDetailsState,
} from '@core/store/study-details/study-details.interfaces';
import {
  StudyDetailsActions,
  StudyDetailsActionsTypes,
} from '@core/store/study-details/study-details.actions';

function baseReducer(
  state: StudyDetailsState = { ...initialStudyDetailsState },
  action: StudyDetailsActions
): StudyDetailsState {
  switch (action.type) {
    case StudyDetailsActionsTypes.Load:
      return {
        ...state,
        projectId: action.projectId,
        studyId: action.studyId,
      };
    case StudyDetailsActionsTypes.LoadSuccess:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export function reducer(
  state: StudyDetailsState,
  action: StudyDetailsActions
): StudyDetailsState {
  return withLoadable(baseReducer, {
    loadingActionType: StudyDetailsActionsTypes.Load,
    successActionType: StudyDetailsActionsTypes.LoadSuccess,
    errorActionType: StudyDetailsActionsTypes.LoadError,
  })(state, action);
}
