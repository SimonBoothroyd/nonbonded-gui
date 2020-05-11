import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';
import { DataSet, DataSetCollection } from '@core/models/datasets';

export const initialDataSet: DataSet = {
  project_identifier: '',
  study_identifier: '',
  optimization_identifier: '',
  data_entries: [],
};

export interface DataSetState extends Loadable, DataSet {}

export const initialDataSetState: DataSetState = {
  ...createDefaultLoadable(),
  ...initialDataSet,
};

export interface DataSetCollectionState extends Loadable, DataSetCollection {}

export const initialDataSetCollectionState: DataSetCollectionState = {
  data_sets: [],
  ...createDefaultLoadable(),
};
