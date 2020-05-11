import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { RouterStateUrl } from '@core/store/routes/route.serializer';

import * as projectReducers from '@core/store/projects/projects.reducers';
import * as datasetReducers from '@core/store/datasets/datasets.reducers';
import * as resultsReducers from '@core/store/results/results.reducers';
import { ProjectCollectionState } from '@core/store/projects/projects.interfaces';
import { DataSetCollectionState } from '@core/store/datasets/datasets.interfaces';
import {
  BenchmarkResultsState,
  OptimizationResultsState,
} from '@core/store/results/results.interfaces';

export interface State {
  projects: ProjectCollectionState;
  datasets: DataSetCollectionState;
  benchmarks: BenchmarkResultsState;
  optimizations: OptimizationResultsState;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  projects: projectReducers.reducer,
  datasets: datasetReducers.reducer,
  benchmarks: resultsReducers.benchmarksReducer,
  optimizations: resultsReducers.optimizationsReducer,
  router: routerReducer,
};
