import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { RouterStateUrl } from '@core/store/routes/route.serializer';

import * as projectsReducers from '@core/store/projects/projects.reducers';
import * as projectReducers from '@core/store/project/project.reducers';

import * as benchmarkResultsReducers from '@core/store/benchmark-results/benchmark-results.reducers';
import * as optimizationPlotsReducers from '@core/store/optimization-plots/optimization-plots.reducers';

import * as datasetsReducers from '@core/store/datasets/datasets.reducers';
import * as datasetReducers from '@core/store/dataset/dataset.reducers';

import * as molsetsReducers from '@core/store/molsets/molsets.reducers';
import * as molsetReducers from '@core/store/molset/molset.reducers';

import { ProjectsState } from '@core/store/projects/projects.interfaces';
import { ProjectState } from '@core/store/project/project.interfaces';
import { DataSetsState } from '@core/store/datasets/datasets.interfaces';
import { DataSetState } from '@core/store/dataset/dataset.interfaces';
import { BenchmarkResultsState } from '@core/store/benchmark-results/benchmark-results.interfaces';
import { OptimizationPlots } from '@core/store/optimization-plots/optimization-plots.interfaces';
import { MoleculeSetState } from '@core/store/molset/molset.interfaces';
import { MoleculeSetsState } from '@core/store/molsets/molsets.interfaces';

export interface State {
  projects: ProjectsState;
  project: ProjectState;

  datasets: DataSetsState;
  dataset: DataSetState;

  molset: MoleculeSetState;
  molsets: MoleculeSetsState;

  benchmarkResults: BenchmarkResultsState;
  optimizationPlots: OptimizationPlots;

  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  projects: projectsReducers.reducer,
  project: projectReducers.reducer,

  datasets: datasetsReducers.reducer,
  dataset: datasetReducers.reducer,

  molset: molsetReducers.reducer,
  molsets: molsetsReducers.reducer,

  benchmarkResults: benchmarkResultsReducers.reducer,
  optimizationPlots: optimizationPlotsReducers.reducer,

  router: routerReducer,
};
