import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';
import { DataSet, DataSetCollection } from '@core/models/datasets';

export const initialDataSet: DataSet = {
  id: '',
  description: '',
  authors: [],
  entries: [],
};

export interface DataSetState extends Loadable, DataSet {}

export const initialDataSetState: DataSetState = {
  ...createDefaultLoadable(),
  ...initialDataSet,
};

export const initialDataSetCollection: DataSetCollection = {
  data_sets: [],
};

export interface DataSetCollectionState extends Loadable, DataSetCollection {}

export const initialDataSetCollectionState: DataSetCollectionState = {
  ...initialDataSetCollection,
  ...createDefaultLoadable(),
};
