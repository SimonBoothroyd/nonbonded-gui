import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { RouterStateUrl } from '@core/store/routes/route.serializer';

import * as projectReducers from '@core/store/project/project.reducers';
import * as dataSetReducers from '@core/store/dataset/dataset.reducers';

import * as benchmarkPlotsReducers from '@core/store/benchmark-plots/benchmark-plots.reducers';
import * as optimizationPlotsReducers from '@core/store/optimization-plots/optimization-plots.reducers';

import { ProjectState } from '@core/store/project/project.interfaces';
import { DataSetState } from '@core/store/dataset/dataset.interfaces';
import { BenchmarkPlots } from '@core/store/benchmark-plots/benchmark-plots.interfaces';
import { OptimizationPlots } from '@core/store/optimization-plots/optimization-plots.interfaces';

export interface State {
  project: ProjectState;
  dataset: DataSetState;

  benchmarkPlots: BenchmarkPlots;
  optimizationPlots: OptimizationPlots;

  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  project: projectReducers.reducer,
  dataset: dataSetReducers.reducer,

  benchmarkPlots: benchmarkPlotsReducers.reducer,
  optimizationPlots: optimizationPlotsReducers.reducer,

  router: routerReducer,
};
