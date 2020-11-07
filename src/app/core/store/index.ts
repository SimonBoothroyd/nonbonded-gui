import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { RouterStateUrl } from '@core/store/routes/route.serializer';

import * as projectsReducers from '@core/store/projects/projects.reducers';
import * as projectReducers from '@core/store/project/project.reducers';

import * as datasetsReducers from '@core/store/datasets/datasets.reducers';
import * as datasetReducers from '@core/store/dataset/dataset.reducers';

// import * as studyDetailsReducers from '@core/store/study-details/study-details.reducers';
import * as benchmarkResultsReducers from '@core/store/benchmark-results/benchmark-results.reducers';

import { ProjectsState } from '@core/store/projects/projects.interfaces';
import { ProjectState } from '@core/store/project/project.interfaces';
import { DataSetsState } from '@core/store/datasets/datasets.interfaces';
import { DataSetState } from '@core/store/dataset/dataset.interfaces';
import { BenchmarkResultsState } from '@core/store/benchmark-results/benchmark-results.interfaces';

export interface State {
  projects: ProjectsState;
  project: ProjectState;

  // studyDetails: StudyDetailsState;
  benchmarkResults: BenchmarkResultsState;

  datasets: DataSetsState;
  dataset: DataSetState;

  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  projects: projectsReducers.reducer,
  project: projectReducers.reducer,

  // studyDetails: studyDetailsReducers.reducer,
  benchmarkResults: benchmarkResultsReducers.reducer,

  datasets: datasetsReducers.reducer,
  dataset: datasetReducers.reducer,

  router: routerReducer,
};
