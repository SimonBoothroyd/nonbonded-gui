import { DataSetCollection } from '@core/models/datasets';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

export const initialDataSets: DataSetCollection = {
  data_sets: [],
};

export interface DataSetsState extends Loadable, DataSetCollection {}

export const initialDataSetsState: DataSetsState = {
  ...createDefaultLoadable(),
  ...initialDataSets,
};
