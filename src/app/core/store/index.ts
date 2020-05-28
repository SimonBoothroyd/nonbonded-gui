import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { RouterStateUrl } from '@core/store/routes/route.serializer';

import * as projectsReducers from '@core/store/projects/projects.reducers';
import * as projectReducers from '@core/store/project/project.reducers';
import * as studyDetailsReducers from '@core/store/study-details/study-details.reducers';

import { ProjectsState } from '@core/store/projects/projects.interfaces';
import { ProjectState } from '@core/store/project/project.interfaces';
import { StudyDetailsState } from '@core/store/study-details/study-details.interfaces';

export interface State {
  projects: ProjectsState;
  project: ProjectState;

  studyDetails: StudyDetailsState;

  // datasets: DataSetCollectionState;
  // dataset: DataSetState

  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  projects: projectsReducers.reducer,
  project: projectReducers.reducer,

  studyDetails: studyDetailsReducers.reducer,

  // datasets: datasetReducers.reducer,

  router: routerReducer,
};
